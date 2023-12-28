import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationDialogComponent } from './registration-dialog.component';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import QuotationSidebarComponent from '../quotation-sidebar/quotation-sidebar.component';



@NgModule({
  declarations: [
    RegistrationDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule, ReactiveFormsModule,QuotationSidebarComponent
  ],
  providers: [
    ApiService
    
  ]
})
export class RegistrationDialogModule { }
