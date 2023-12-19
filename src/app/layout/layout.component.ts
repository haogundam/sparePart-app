import { Component } from '@angular/core';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})



export class LayoutComponent {
  constructor(private router: Router) { }
  
  quotation() {
    this.router.navigate(['/quotation'])
  }

  logout() {
    this.router.navigate(['']);
  }
  onHistory() {
    this.router.navigate(['/history']);
  }

  empty(){
    
  }
}
