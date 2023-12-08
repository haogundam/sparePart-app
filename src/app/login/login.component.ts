import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}
  userEmail: any;
  userPassword: any;
  onLogin() {

    ApiService.login(this.userEmail,this.userPassword);
    // Use your authentication service here
    // For demonstration, navigate to layout
    this.router.navigate(['/layout']);
   
  }
}