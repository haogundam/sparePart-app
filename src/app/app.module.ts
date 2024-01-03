import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationDialogModule } from './registration-dialog/registration-dialog.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { appConfig } from './app.config';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule, FormsModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
