import { Component, OnInit ,ViewChild, ElementRef, Input ,Output, EventEmitter, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import {map, startWith} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { DataService } from '../services/customerInfo';
import { switchMap } from 'rxjs/operators';
import { DialogComponent } from '../dialog/dialog-component'; 
import { MatDialogModule } from '@angular/material/dialog';

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


interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone: string;
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


export class QuotationSidebarComponent implements OnInit{
 
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
  mockupCustomers: Customer[] = [
    { customer_id: 12323, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { customer_id: 22323, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { customer_id: 33333, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-123-4567' },
  ];

  constructor (private dataService: DataService, private dialogRef:MatDialogRef) {
    this.filteredOptions = this.dataService.getDataByName('');

    this.selectedCustomer = [
      { customer_id: 0, name: '', phone: '',email:'' },
      // More customers...
    ];
  }

  selectedCustomer : Customer[] = [];
  customerSearch: any;

  //search Customer
  customerFilter() {
    this.selectedCustomer = this.mockupCustomers.filter(cust =>
       cust.name.toLowerCase().trim().includes(this.customerSearch.toLowerCase().trim()));
  }

  myControl = new FormControl<string | User>('');
  filteredOptions: Observable<User[]>;


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : of([]); // Use 'of' to wrap the array in an observable
      })
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Observable<User[]> {
    return this.dataService.getDataByName(name).pipe(
      map(users => users || []),
      startWith([]) // Add this line to emit an empty array immediately
    );
  }

  createCustomer(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { user } // Pass user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

