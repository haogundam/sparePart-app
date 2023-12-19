import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { LayoutComponent } from '../layout/layout.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginFailDialog') loginFailDialog: any;

  userEmail: string = '';
  userPassword: string = '';
  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, private http: HttpClient) { }

  onLogin(userEmail: string, userPassword: string) {
    
    this.authService.login(userEmail, userPassword).subscribe(
      (token: string) => {
        console.log('Token:', token);

        // Check if a valid token is received
        if (token) {
          // Save the token in localStorage or a more secure storage
          localStorage.setItem('token', token);
          localStorage.setItem('userEmail', userEmail);
          // Navigate to the layout page
          this.router.navigate(['/history']);
        } else {
          console.error('Invalid token');
         
          // Handle invalid token or login failure
        }
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginFailDialog.nativeElement.showModal();

        
        // Handle login error
      }
    );
  }


}