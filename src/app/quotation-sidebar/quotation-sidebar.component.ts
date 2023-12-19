import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import {Observable, of} from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Customer } from '../models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

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
  imports: [CommonModule,FormsModule,MatFormFieldModule,
    MatInputModule, MatAutocompleteModule,
    ReactiveFormsModule, AsyncPipe, DialogComponent,
    MatDialogModule
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
    { categoryName: 'Category 1', partName: 'AAAAAA', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'BBBBBB', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 1', partName: 'CCCCCC', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'DDDDDD', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 1', partName: 'EEEEEE', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'FFFFFF', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 1', partName: 'GGGGGG', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'HHHHHH', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
  ];

  option = this.quotationList;

  customerSearch: string = '';
  customer: Customer[] = [];

  constructor(private apiService : ApiService, public dialog: MatDialog) {}

onSearch() {
  if (this.customerSearch.trim() !== '') {
    this.apiService.searchCustomerByName(this.customerSearch).subscribe(
      (customers : Customer[]) =>
    {
      this.customer = customers;
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
  const dialogRef = this.dialog.open(RegistrationDialogComponent, {
    width: '400px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The registration dialog was closed',result);
  });
 }
}