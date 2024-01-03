import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard.service';
import {MaterialModule} from './material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';
import { authInterceptor } from './interceptors/auth.interceptor';
import { appConfig } from './app.config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet,MaterialModule],
  providers: [ApiService, AuthGuard, SharedDataService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'sparePart';

  
}
