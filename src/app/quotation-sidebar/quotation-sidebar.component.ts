import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { Customer } from '../models/customer.model';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { CreateQuotationResponse } from '../models/quotation.model';
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


interface FilteredOptions {
  sku: number;
  name: string;
  partId: number;
  unitPrice: number;
}

@Component({
  selector: 'app-quotation-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule, AsyncPipe, DialogComponent

  ],
  templateUrl: './quotation-sidebar.component.html',
  styleUrls: ['./quotation-sidebar.component.scss'],
})

// implements OnInit
export class QuotationSidebarComponent {

  filteredOption: FilteredOptions[] = [
    { sku: 1234, name: "Joseph", partId: 1234, unitPrice: 22.32 },]

    ;
  searchCustomerName: string = '';

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

  customer: Customer[] = [];

  constructor(private apiService: ApiService) { }

  searchCustomer() {
    if (this.searchCustomerName.trim() !== '') {
      this.apiService.searchCustomerByName(this.searchCustomerName).subscribe(
        (response: HttpResponse<Customer[]>) => {
          this.customer = response.body as Customer[];
          console.log('Customer Name:', this.customer);
        },
        (error) => {
          console.error('Error fetching customer', error);
          console.log('Customer Name:', this.customer)
        }
      );
    }
  }
  createQuotation(id: number) {
    console.log('Creating quotation for customer ID:', id);
    this.apiService.createQuotation(id).subscribe(
      (response: string) => {
        console.log('Quotation created successfully',response );
      },
      (error) => {
        console.error('Error creating quotation', error);
      }
    );
  }

  //register customer
  openRegistrationForm(): void {

  }
}