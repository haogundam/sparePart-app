import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LayoutComponent } from './layout/layout.component';
import { DetailSidebarComponent } from './detail-sidebar/detail-sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import AuthService from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule, HttpClientModule,RouterOutlet],
  providers: [ApiService, HttpClientModule, AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'sparePart';
}
