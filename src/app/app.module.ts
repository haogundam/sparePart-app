import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationDialogModule } from './registration-dialog/registration-dialog.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule, FormsModule, MatDialogModule
  ],
  providers: [HttpClientModule,HttpClient,HttpResponse, { provide: HTTP_INTERCEPTORS, useClass:  AuthInterceptorService, multi: true },],
  bootstrap: [],
})
export class AppModule {}
