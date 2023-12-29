import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Customer } from '../models/customer.model';
import {
  MatDialog, MatDialogActions,
  MatDialogClose, MatDialogContent, MatDialogTitle,
} from '@angular/material/dialog';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { startWith, map } from 'rxjs';
import { RegistrationDialogModule } from '../registration-dialog/registration-dialog.module';
import { QuotationPart } from '../models/quotation.model';
import { QuotationComponent } from '../quotation/quotation.component';
import { HttpResponse } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';
import { __values } from 'tslib';
import { MatOptionSelectionChange } from '@angular/material/core';

export interface User {
  //sku: string;
  name: string;
  //partId: string;
  //unitPrice: number;
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
  imports: [CommonModule, FormsModule, MatFormFieldModule,
    MatInputModule, MatAutocompleteModule,
    ReactiveFormsModule, AsyncPipe, DialogComponent,
    MatDialogModule, MatButtonModule, RegistrationDialogModule
  ],
  templateUrl: './quotation-sidebar.component.html',
  styleUrls: ['./quotation-sidebar.component.scss'],
})

// implements OnInit
export class QuotationSidebarComponent implements OnInit {

  openModal(arg0: string) {
    throw new Error('Method not implemented.');
  }

  // filteredOption: FilteredOptions[] = [
  //   { sku: 1234, name: "Joseph", partId: 1234, unitPrice: 22.32 },];
  searchCustomerName: string = '';
  customerId: number | null = 0;
  quotationIdd: number | null = 0;
  partsInQuotation: any[] = [];
  quotepartId: number = 0;

  myControl = new FormControl<string | User>('');
  // options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions!: Observable<User[]>;


  ngOnInit(): void {
    // this.sharedDataService.currentCustomerId.subscribe(id => {
    //   this.customerId = id;
    // });
    // this.sharedDataService.currentQuotationId.subscribe(id => {
    //   this.quotationIdd = id;
    // });
    // this.sharedDataService.partsInQuotation$.subscribe(parts => {
    //   this.partsInQuotation = parts;
    // });
    // this.sharedDataService.currentQuotePartId.subscribe(id => {
    //   this.quotepartId = id ?? 0;
    // });

    this.fetchCustomerDetails();
    this.searchControl.valueChanges
    .pipe(debounceTime(100))
    .subscribe((value) => {
      this.customerName = this.searchControl.value;
      // this.filteredOption = value.toLowerCase().includes(this.customerName.toLowerCase())
      // ? [this.customerName]
      // : [] ;
      console.log("searching...",this.searchControl.value);
      this.fetchCustomerDetails();
    });
  }
  //Arrays of Dummy Data
  quotationList: QuotationListItem[] = [
  ];

  // option = this.quotationList;

  filteredOption :string[] = []
  searchControl = new FormControl();
  // placeholder: Customer[] = [];
  options:string[] = [];
  constructor(private apiService: ApiService, private sharedDataService: SharedDataService, private dialog: MatDialog) { 
  }
  customerName:string = "";


  //fetch all customer data
  fetchCustomerDetails(): void {
    this.apiService.searchCustomerByName(this.customerName, 1).subscribe(
      (response: HttpResponse<Customer[]>) => {
        // Assuming response.body contains the array of customers
        console.log("response: ",response);
        this.options = (response.body || []).map((customer) => customer.customerName) || [];
        // this.options = this.placeholder[0].customerName;
        console.log('Fetched customer data:', this.options);
      },
      (error) => {
        console.error('Error Fetching Customer Data: ', error);
      });
  }

  //filter options based on user's input
  filterOptions(value: string): void {
    this.filteredOption = this.options.filter((option: string) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }

  customerQuery: any;
  //search function
  searchCustomer(){
    if (this.searchCustomerName.trim() !== '') {
      this.apiService.searchCustomerByName(this.searchCustomerName,1).subscribe(
        (response: HttpResponse<Customer[]>) => {
          this.customerQuery = response.body as Customer[],
          console.log('Customer Name:', this.customerQuery);
        },
        (error) => {
          console.error('Error fetching customer', error);
          console.log('Customer Name:', this.customerQuery)
        }
      );
  }
  }

  //pop up form event
  handleOptionSelection(event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.openRegistrationForm();
    }
  }
  

  quotationId: number = 0;
  quoteDetail: QuotationPart[] = [];
  quotationDate: string = '';

  createQuotation(id: number) {
    console.log('Creating quotation for customer ID:', id);
    this.apiService.createQuotation(id).subscribe(
      (response: string) => {
        this.quotationId = response as unknown as number;
        this.sharedDataService.changeQuotationId(this.quotationId);
        console.log('Quotation created successfully', response);
        this.sharedDataService.changeCustomerId(id);
        this.apiService.searchQuotationListDetailItem(response as unknown as number,1, 1).subscribe(
          (dateResponse: HttpResponse<QuotationPart[]>) => {
            this.quotationDate = (dateResponse.body as any).parts.quoteDate as string;
            this.quoteDetail = (dateResponse.body as any).parts.quoteDetail;
            console.log('Quotation created successfully', dateResponse);
          }
        );
      },
      (error) => {
        console.error('Error creating quotation', error);
      }
    );
  }

  //register customer
  openRegistrationForm(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '700px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // onDeleteClick(index: number, partId: number) {
  //   this.sharedDataService.removePartFromQuotation(index);
  //   if (this.customerId !== null && this.quotationId !== null) {
  //     this.apiService.removePartFromQuotation(this.customerId, this.quotationId, this.quotepartId).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.error('Error removing part', error);
  //       }
  //     );
  //   }
  }

  // submitQuotation() {
  //   if (this.customerId !== null && this.quotationId !== null) {
  //     this.apiService.submitQuotation(this.customerId, this.quotationId).subscribe(
  //       (response: any) => {
  //         console.log('Quotation submitted successfully', response);
  //       },
  //       (error) => {
  //         console.error('Error submitting quotation', error);
  //       }
  //     );
  //   }
  // }  
