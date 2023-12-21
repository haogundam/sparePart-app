import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LayoutComponent } from './layout/layout.component';
import { DetailSidebarComponent } from './detail-sidebar/detail-sidebar.component';
import { ApiService } from './services/api.service';
import { HttpClientModule, HttpResponse, HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard.service';
import {MaterialModule} from './material.module';
import { QuotationSidebarComponent } from './quotation-sidebar/quotation-sidebar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet,MaterialModule],
  providers: [ApiService, HttpClientModule, AuthService, AuthGuard, HttpResponse, HttpClient,QuotationSidebarComponent, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'sparePart';

}
