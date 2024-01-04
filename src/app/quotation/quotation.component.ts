import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
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
import QuotationSidebarComponent from '../quotation-sidebar/quotation-sidebar.component';
import { Customer } from '../models/customer.model';
import { QuotationListResponse, QuotationPart, QuotePartAdd } from '../models/quotation.model';
import { parts, partsResponse } from '../models/parts.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SharedDataService } from '../shared-data.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-quotation',
  standalone: true,
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.scss',
  imports: [LayoutComponent, QuotationSidebarComponent, CommonModule, FormsModule]
})
export class QuotationComponent implements OnInit , OnDestroy {
quantityPlaceholder= 1;

  ngOnInit(): void {
    this.sharedDataService.loadInitialData(this.quotationIdd ?? 0, this.customerId ?? 0);
    this.sharedDataService.clearQuotation();
  }
  ngOnDestroy(): void {
    this.sharedDataService.clearQuotation();
  }
  filteredproducts: partsResponse[] = [] || null;
  selectedSKU: parts[] = [];
  similarProducts: partsResponse[] = [];;

  onSearch() {
    throw new Error('Method not implemented.');
  }
  searchQueryPart: any;

  constructor(private apiService: ApiService, private sharedDataService: SharedDataService) {
    this.apiService.GetAllParts().subscribe(
      (part: HttpResponse<partsResponse[]>) => {
        this.filteredproducts = part.body as partsResponse[];
        console.log('SKU All:', this.filteredproducts);
      },
      (error) => {
        console.error('Error fetching parts sku:', error);
      }
    )
    this.sharedDataService.currentCustomerId.subscribe(id => {
      this.customerId = id ?? 0;
    });
    this.sharedDataService.currentQuotationId.subscribe(id => {
      this.quotationIdd = id ?? 0;
    });
    this.sharedDataService.currentQuotePartId.subscribe(id => {
      this.quotePartId = id ?? 0;
    });
   }



  //search product by SKU
  searchPart(searchQueryPart: string) {
    return this.apiService.searchPartsBySKU(searchQueryPart).subscribe(
      (part: HttpResponse<partsResponse[]>) => {
        this.filteredproducts = part.body as partsResponse[];
        console.log('SKU:', this.filteredproducts);
        if (searchQueryPart != null) {
          this.showSameCategorySKU(searchQueryPart);
        }
      },
      (error) => {
        console.error('Error fetching part lists:', error);
      }
    )
  };
  customerId!: number;
  quotationIdd!: number;
  quotePartId!: number;


  showSameCategorySKU(sku: string) {
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
  addPartToQuotation(customerId: number, quoteNo: number, partId: number, quantity: number, unitPrice: number, partName: string, sellingPrice: number,buyingPrice:number, warehouseName: string) {
    console.log('Adding part to quotation:', quoteNo);
    if (quantity ==0 || quantity == null || quantity == undefined || Number.isNaN(quantity))
    {
      quantity = 1;
    }
    if (!quoteNo || quoteNo === 0) {
      alert('Invalid quotation ID. Cannot add parts to quotation. Please create a new quotation in search bar / select an existing quotation. ');
      return;
    }

    if (unitPrice == 0 || unitPrice == null || unitPrice == undefined || Number.isNaN(unitPrice)) {
      unitPrice = sellingPrice;
      console.log('unitPrice:', unitPrice, 'selling price:', sellingPrice);
    }
    const product = this.filteredproducts.find(p => p.partId === partId);

    // Check if the entered quantity exceeds the available quantity
    if (product && quantity > product.totalQuantity) {
      // Display an error message or a prompt
      alert(`Cannot add item to quotation. Entered quantity (${quantity}) exceeds available quantity (${product.totalQuantity}).`);
      return;
    }
    // Prevent adding a part to quotation if the entered price is less than the selling price 
    // else if (unitPrice < sellingPrice) {
    //   alert(`Cannot add item to quotation. Entered price (${unitPrice}) is less than selling price (${sellingPrice}).`);
    //   return;
    // } 

    if (unitPrice < buyingPrice) {
      alert(`Cannot add item to quotation. Entered price (${unitPrice}) is less than buying price (${buyingPrice}).`);
      return;
    }
    this.quoteAddPart = {
      partId: partId,
      warehouseName: warehouseName,
      unitPrice: unitPrice,
      quantity: quantity,
    };
   
    console.log('Adding part to quotation:', this.quoteAddPart);
    this.apiService.addPartToQuotation(customerId, quoteNo, this.quoteAddPart).subscribe(
      (part: HttpResponse<number>) => {
        
        console.log(part);
        this.quotePartId = part.body as number; 
        console.log('Quote Part ID:', this.quotePartId);
        this.sharedDataService.addPartToQuotation({ quotePartId: this.quotePartId, partId: partId, partName: partName, quantity: quantity, unitPrice: unitPrice, warehouseName: warehouseName });
        this.sharedDataService.changeQuotePartId(this.quotePartId);
      },
      (error) => {
        console.error('Error adding part to quotation:', error);
        alert(`This part (ID: ${partName}) has already been added to the quotation. Please remove it from the quotation before adding it again.`);

      }
    )
    console.log('Selected SKU:', this.selectedSKU);
  }

}


