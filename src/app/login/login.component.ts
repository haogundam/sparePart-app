import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { LayoutComponent } from '../layout/layout.component';
import { Dialog } from '@angular/cdk/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';

import { FailLoginComponent } from '../fail-login/fail-login.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginFailDialog') loginFailDialog: any;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  userEmail: string = '';
  userPassword: string = '';
  constructor(private router: Router, private apiService: ApiService,  private http: HttpClient,private dialog:Dialog) { }

  onLogin(userEmail: string, userPassword: string) {
    
    this.apiService.login(userEmail, userPassword).subscribe(
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
        alert(`Login Failed ! Wrong Email or Password`);

        console.error('Login failed:', error);

        // const dialogRef = this.dialog.open(FailLoginComponent, {
        //   width: '250px',
        // });
        
        
        // Handle login error
      }
    );
  }

  private checkTokenValidity() {
    const storedToken = localStorage.getItem('token');

    // Check if the stored token is present and not expired
    if (storedToken && !this.jwtHelper.isTokenExpired(storedToken)) {
      // Token is valid and not expired
      console.log('Token is still valid. Navigating to the layout page...');
      this.router.navigate(['/history']);
    } else {
      // Token is expired or not present
      console.log('Token is expired or not present.');
      
      this.refreshToken();
    }
  }

  private refreshToken() {
    const userEmail = localStorage.getItem('userEmail') ?? '';
    // Check if the stored token is expired
    if (this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
      this.apiService.refreshToken(userEmail).subscribe(
        (newToken: string) => {
          // Handle the refreshed token, you might want to update the stored token
          console.log('Refreshed Token:', newToken);
          localStorage.setItem('token', newToken);
          this.router.navigate(['/history']);
        },
        (refreshError) => {
          console.error('Failed to refresh token:', refreshError);
    
          // Handle the error, for example, redirect to the login page only if it's not a 401 error
          if (refreshError.status !== 401) {
            this.router.navigate(['/']);
          }
        }
      );
    } else {
      // If the token is not expired, navigate to the desired page
      this.router.navigate(['/history']);
    }
  }
  

}