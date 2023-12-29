import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LayoutComponent } from './layout/layout.component';
import { DetailSidebarComponent } from './detail-sidebar/detail-sidebar.component';
// import { MatIconModule } from '@angular/material/icon';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { ApiService } from './services/api.service';
// import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet,
//     MatIconModule,DetailSidebarComponent,
//      LoginComponent, HistoryPageComponent,
//      LayoutComponent,HttpClientModule,
//      ReactiveFormsModule, MatAutocompleteModule
//     ],
//   providers: [ApiService,HttpClientModule],
import { ApiService } from './services/api.service';
import { HttpClientModule, HttpResponse, HttpClient } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard.service';
import {MaterialModule} from './material.module';
import{ QuotationSidebarComponent} from './quotation-sidebar/quotation-sidebar.component';
import { SharedDataService } from './shared-data.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterOutlet,MaterialModule],
  providers: [ApiService, AuthGuard, SharedDataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'sparePart';
}