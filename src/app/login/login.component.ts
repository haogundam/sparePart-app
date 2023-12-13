import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
import AuthService from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userEmail: string = '';
  userPassword: string = '';
  constructor(private router: Router, private apiService: ApiService, private authService: AuthService, private http: HttpClient) { }

  onLogin(userEmail: string, userPassword: string) {
    this.authService.login(userEmail, userPassword).subscribe(
      (user: any) => {
        console.log('User:', user);
      }
    )
      ;
    // this.authService.login(this.userEmail,this.userPassword);
    console.log('login');

    // Use your authentication service here
    // For demonstration, navigate to layout
    this.router.navigate(['/layout']);
  }

}