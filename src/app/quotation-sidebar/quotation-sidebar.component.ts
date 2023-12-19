import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AsyncPipe } from '@angular/common';
import {Observable, of} from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component'; 
import { ApiService } from '../services/api.service';
import { Customer } from '../models/customer.model';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { HttpResponse } from '@angular/common/http';
export interface User {
  sku: string;
  name: string;
  partId: string;
  unitPrice: number;
}

interface QuotationListItem {
  // Define the properties of a quotation list item
  categoryName: string;
  partName: string;
  quantityLeft: number;
  price: number;
  warehouse: string;
}


interface FilteredOptions{
  sku:number;
  name:string;
  partId:number;
  unitPrice:number;
}

@Component({
  selector: 'app-quotation-sidebar',
  standalone: true,
  imports: [CommonModule,FormsModule,
     MatAutocompleteModule,
    ReactiveFormsModule, AsyncPipe, DialogComponent
    
  ],
  templateUrl: './quotation-sidebar.component.html',
  styleUrls: ['./quotation-sidebar.component.scss'],
})

// implements OnInit
export class QuotationSidebarComponent {
filteredOption: FilteredOptions[]= [
  {sku:1234,name:"Joseph",partId:1234,unitPrice:22.32},]

;
 
  openModal(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private _model: any;
  onDeleteClick() {
    throw new Error('Method not implemented.');
  }

  //Arrays of Dummy Data
  quotationList: QuotationListItem[] = [
  ];

  option = this.quotationList;

  customerSearch: string = '';
  customer: Customer[] = [];

  constructor(private apiService : ApiService) {}

onSearch() {
  if (this.customerSearch.trim() !== '') {
    this.apiService.searchCustomerByName(this.customerSearch).subscribe(
      (response: HttpResponse<Customer[]>) => {
        this.customer = response.body as Customer[];
      },
      (error) => {
        console.error('Error fetching customer', error);
        console.log('Customer Name:', this.customer)
      }
    );
  }
}

//register customer
openRegistrationForm():void {
 
 }
}