import { Component, Inject, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';
import { QuotationSidebarComponent } from '../quotation-sidebar/quotation-sidebar.component';
import { Customer } from '../models/customer.model';
import { QuotationListResponse } from '../models/quotation.model';
import { parts, partsResponse } from '../models/parts.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn:'root',
})

@Component({
    selector: 'app-quotation',
    standalone: true,
    templateUrl: './quotation.component.html',
    styleUrl: './quotation.component.scss',
    imports: [LayoutComponent, QuotationSidebarComponent,CommonModule, FormsModule]
})
export class QuotationComponent implements OnInit{

filteredproducts: partsResponse[] = [];
selectedSKU: parts[]=[];

onSearch() {
throw new Error('Method not implemented.');
}
  searchQueryPart : any;

  constructor(private apiService: ApiService){}



  //search product by SKU
  searchPart(SKU: string): Observable<partsResponse[]> {
    return this.apiService.GetAllParts().pipe(
      map((searchQueryPart: partsResponse[]) => {
        this.filteredproducts = searchQueryPart;
        console.log('SKU:', this.filteredproducts);
        return this.filteredproducts; 
      }),
    );
  }

  ngOnInit(): void {
    this.apiService.GetAllParts().subscribe(
      (part : partsResponse[]) => {
        this.filteredproducts = part;
        console.log('SKU:', this.filteredproducts);
      },
      (error) => {
        console.error('Error fetching parts sku:', error);
      }
    )
  }

//search customer by name
  



  //reset visibility of parts list
  resetShowPartList() {

  }
}


