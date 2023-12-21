import { Component } from '@angular/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})



export class LayoutComponent {
   
  constructor(private router: Router, private authService: AuthService) {}
  quotation() {
    this.router.navigate(['/quotation']);
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['']);
  }
  onHistory() {
    this.router.navigate(['/history']);
  }
  
  empty(){
    
  }

}
