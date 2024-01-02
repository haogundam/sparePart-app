import { HostListener, Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { Observable, concatAll, debounceTime, of } from 'rxjs';
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
import { QuotationPart } from '../models/quotation.model';
import { QuotationComponent } from '../quotation/quotation.component';
import { HttpResponse } from '@angular/common/http';
import { SharedDataService } from '../shared-data.service';
import { RegistrationDialogModule } from '../registration-dialog/registration-dialog.module';
import { ActivatedRoute } from '@angular/router';
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
export default class QuotationSidebarComponent implements OnInit {
  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any) {
  //   this.sharedDataService.clearQuotation();
  //   $event.returnValue = true;
  // }


  totalPrice: any;
  openModal(arg0: string) {
    throw new Error('Method not implemented.');
  }



  searchCustomerName: string = '';
  customerId: number | null = 0;
  partsInQuotation: any[] = [];
  quotepartId: number = 0;
  ngOnInit(): void {


  }

  myControl = new FormControl<string | User>('');
  // options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions!: Observable<User[]>;

  customer: Customer[] = [];

  constructor(private apiService: ApiService, private sharedDataService: SharedDataService, private dialog: MatDialog, private route: ActivatedRoute, private quotationComponent: QuotationComponent) {
    this.sharedDataService.currentCustomerId.subscribe(id => {
      this.customerId = id;
    });
    this.sharedDataService.currentQuotationId.subscribe(id => {
      this.quotationId = id;
    });
    this.sharedDataService.partsInQuotation$.subscribe(parts => {
      this.partsInQuotation = parts;
    });
    this.sharedDataService.currentQuotePartId.subscribe(id => {
      this.quotepartId = id ?? 0;
    });
    this.loadQuotationDetails(this.quotationId ?? 0, this.customerId ?? 0);
   
    this.fetchCustomerDetails();
    this.searchControl.valueChanges
      .pipe(debounceTime(100))
      .subscribe((value) => {
        this.customerName = this.searchControl.value;
        // this.filteredOption = value.toLowerCase().includes(this.customerName.toLowerCase())
        // ? [this.customerName]
        // : [] ;
        console.log("searching...", this.searchControl.value);
        this.fetchCustomerDetails();
      });
  }


  filteredOption: string[] = []
  searchControl = new FormControl();
  // placeholder: Customer[] = [];
  options: string[] = []; 
  customerName: string = "";

  customerQuery: string = '';
  searchCustomer() {
    if (this.searchCustomerName.trim() !== '') {
      this.apiService.searchCustomerByName(this.searchCustomerName, 1).subscribe(
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
  quotationId: number | null = 0;
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
        this.apiService.searchQuotationListDetailItem(response as unknown as number, this.customer[0].customerId, 1).subscribe(
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
      width: '500px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onDeleteClick(index: number, quotePartId: number, warehouseName: string) {
    console.log(quotePartId);
    if (this.customerId !== null && this.quotationId !== null) {
      this.apiService.removePartFromQuotation(this.customerId, this.quotationId, quotePartId, warehouseName).subscribe(
        (response: any) => {
          this.sharedDataService.removePartFromQuotation(index);

          console.log(response);
        },
        (error) => {
          console.error('Error removing part', error);
        }
      );
    }
    
  }

  submitQuotation() {
    if (this.customerId !== null && this.quotationId !== null) {
      this.apiService.submitQuotation(this.customerId, this.quotationId).subscribe(
        (response: any) => {

          console.log('Quotation submitted successfully', response);
          this.openSnackBar();
          alert("Quotation Submitted Successfully");
          this.sharedDataService.clearQuotation();

          location.reload();
          console.log('Quotation ', this.sharedDataService.getPartsInQuotation());
        },
        (error) => {
          console.error('Error submitting quotation', error);
        }
      );
    }
  }
  clearQuotation() {
    this.apiService.clearQuotation(this.customerId ?? 0, this.quotationId ?? 0).subscribe(
      (response: any) => {
        console.log('Quotation cleared successfully', response);
        this.sharedDataService.clearQuotation();
      },
      (error) => {
        console.error('Error clearing quotation', error);
      }
    );
  }
  loadQuotationDetails(quoteId: number, customerId: number) {
    this.apiService.searchQuotationListDetailItem(quoteId, customerId, 1).subscribe(
      (dateResponse: HttpResponse<QuotationPart[]>) => {
        this.quotationDate = (dateResponse.body as any).parts.quoteDate as string;
        this.quoteDetail = (dateResponse.body as any).parts;
        this.partsInQuotation = (dateResponse.body as any).parts;
        this.sharedDataService.changeQuotationId(quoteId);
        this.sharedDataService.changeCustomerId(customerId);
        console.log('Quotation edit opened successfully', dateResponse);
      }
      ,
      error => {

      }
    );
  }
  searchPart(searchQueryPart: string) {
    this.quotationComponent.searchPart(searchQueryPart);
  };

  openSnackBar() {
    const x = document.getElementById("snackbar");

    if (x) {
      // Add the "show" class to DIV
      x.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(() => {
        if (x) {
          x.className = x.className.replace("show", "");
        }
      }, 3000);
    }
  }
  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.partsInQuotation.forEach(option => {
      totalPrice += option.unitPrice * option.quantity;
    });
    return (totalPrice.toFixed(2) as unknown as number);
  }

  searchReturnCustomerId:number = 0;
  optionSelected(option: string, event: MatOptionSelectionChange): void {
    if (event.isUserInput) {

      option = option.split('(')[0].trim();
      const customerId = this.apiService.searchCustomerByName(option,1).subscribe(
        (response: HttpResponse<Customer[]>) => {
          
          this.searchReturnCustomerId = (response.body || []).map((customer) => customer.customerId)[0] || 0;
          // this.options = this.placeholder[0].customerName;
          console.log('Fetched customer id:', this.searchReturnCustomerId);
          this.createQuotation(this.searchReturnCustomerId);
          this.sharedDataService.clearQuotation();
        },
        (error) => {
          console.error('Error Fetching Customer id: ', error);
        }
      );
     
    }
  }

  //j

  //fetch all customer data
  fetchCustomerDetails(): void {
    this.apiService.searchCustomerByName(this.customerName, 1).subscribe(
      (response: HttpResponse<Customer[]>) => {
        console.log("response: ",response);
        const combinedOptions = response.body?.map(customer => `${customer.customerName} ( ${customer.customerContact} )`) || [];
        this.options = combinedOptions;

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

  handleOptionSelection(event: MatOptionSelectionChange): void {
    if (event.isUserInput) {
      this.openRegistrationForm();
    }
  }

}