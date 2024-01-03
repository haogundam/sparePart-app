import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { noop } from 'rxjs';
import { noopInterceptorProvider } from './app/interceptors/noop-provider';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
