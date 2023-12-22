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
import { QuotationListResponse, QuotationPart,QuotePartAdd } from '../models/quotation.model';
import { parts, partsResponse } from '../models/parts.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SharedDataService } from '../shared-data.service';

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
similarProducts:  partsResponse[] = [];;

onSearch() {
throw new Error('Method not implemented.');
}
  searchQueryPart : any;

  constructor(private apiService: ApiService,private sharedDataService: SharedDataService){}



  //search product by SKU
  searchPart(searchQueryPart: string) {
    return this.apiService.searchPartsBySKU(searchQueryPart).subscribe(
      (part: HttpResponse<partsResponse[]>) => {
        this.filteredproducts = part.body as partsResponse[];
        console.log('SKU:', this.filteredproducts);
        if (searchQueryPart != null){
          this.showSameCategorySKU(searchQueryPart);
        }
      },
      (error) => {
        console.error('Error fetching part lists:', error);
      }
    )
  };
  customerId!: number;
  quotationIdd!: number ;
  quotePartId!: number;
  ngOnInit(): void {
    this.apiService.GetAllParts().subscribe(
      (part : HttpResponse<partsResponse[]>) => {
        this.filteredproducts = part.body as partsResponse[];
        console.log('SKU All:', this.filteredproducts);
      },
      (error) => {
        console.error('Error fetching parts sku:', error);
      }
    )
    this.sharedDataService.currentCustomerId.subscribe(id => {
      this.customerId = id??0;
    });
    this.sharedDataService.currentQuotationId.subscribe(id => {
      this.quotationIdd = id??0;
    });
    this.sharedDataService.currentQuotePartId.subscribe(id => {
      this.quotePartId = id??0;
    });
  }

  showSameCategorySKU(sku : string) {
      return this.apiService.showSameCategorySKU(sku).subscribe(
        (part: HttpResponse<partsResponse[]>) => {
          this.similarProducts = part.body as partsResponse[];
          console.log('SKU same category:', this.similarProducts);
        },
        (error) => {
          console.error('Error fetching part lists:', error);
        }
      )
    }
    quoteAddPart!: QuotePartAdd;
  //add part to quotation
  addPartToQuotation(customerId:number ,quoteNo:number,partId:number,quantity : number, unitPrice : number,partName:string,sellingPrice:number) {
    console.log('Adding part to quotation:', quoteNo);
    if (unitPrice == 0 || unitPrice == null || unitPrice == undefined || Number.isNaN(unitPrice)){
      unitPrice = sellingPrice;
      console.log('unitPrice:', unitPrice ,'selling price:', sellingPrice);
    }
    this.quoteAddPart = {
      partId: partId,
      unitPrice: unitPrice,
      quantity: quantity,
    };
    const partToAdd = { partId, quantity, unitPrice, partName };
    this.sharedDataService.addPartToQuotation(partToAdd);
    console.log('Adding part to quotation:', this.quoteAddPart);
    this.apiService.addPartToQuotation(customerId,quoteNo,this.quoteAddPart).subscribe(
      (part: HttpResponse<number>) => { // Fix: Change the type of the parameter to HttpResponse<number>
        console.log( part);
        this.quotePartId = part.body as number; // Access the body of the HttpResponse
        this.sharedDataService.changeQuotePartId(this.quotePartId);
      },
      (error) => {
        console.error('Error adding part to quotation:', error);
      }
    )
    console.log('Selected SKU:', this.selectedSKU);
  }
  //reset visibility of parts list
  resetShowPartList() {

  }
}


