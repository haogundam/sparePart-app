import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationDialogModule } from './registration-dialog/registration-dialog.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule, FormsModule, MatDialogModule
  ],
  providers: [HttpClientModule,HttpClient, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [],
})
export class AppModule {}
