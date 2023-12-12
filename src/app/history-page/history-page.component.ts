import { Component, Inject, OnInit } from '@angular/core';
import { DetailSidebarComponent } from '../detail-sidebar/detail-sidebar.component';
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
import { Customer } from '../models/customer.model';
import { QuotationListResponse } from '../models/quotation.model';
@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [DetailSidebarComponent, LayoutComponent, FormsModule, CommonModule],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent implements OnInit {
selectedQuotationListByCustomerId: any;
selectedQuotationList: any;

  selectedCustomer: Customer[] = [];
  // selectedQuotationList: QuoteList[] = [];
  // selectedQuotationListByCustomerId: QuotationListResponse[] = [];
  onclickCustomer: number = 0;
  showQuotationListItemBoolean: number = 0;
  // selectedQuotationPart: QuotationPart[] = [];
  searchQuery: string = '';
  selectedQuantity: any;
  customerListObservable: Observable<any> = of([]);
  constructor(private snackBar: MatSnackBar, private apiService: ApiService) {
  
   }

  ngOnInit(): void {
    // Call your API service method here
    this.apiService.fetchAllCustomerListByPage(1).subscribe(
      (customers: Customer[]) => {
        this.selectedCustomer = customers;
        console.log('Customers:', this.selectedCustomer);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }


  filteredCustomers: Customer[] = [];
  searchCustomer(customerName: string) {
    //filter customers based on searchQuery
    this.resetShowQuotationState(); 
    this.apiService.searchCustomerByName(customerName).subscribe(
      (customers: Customer[]) => {
        this.selectedCustomer = customers;
        console.log('Customers:', this.selectedCustomer);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  searchQuotation(customerName: string, index: number): void {
    this.resetShowQuotationState();
    this.onclickCustomer = index;
    this.showQuotationListItemBoolean = 1;
    this.apiService.getQuotationListsByCustomerId(index, 1).subscribe(
      (apiResponse: QuotationListResponse[]) => {
        
        this.selectedQuotationListByCustomerId = apiResponse.map((item) => ({
          CustomerId: item.CustomerId,
          CustomerName: item.CustomerName,
          PendingQuotationList: item.PendingQuotationList,
          PaidQuotationList: item.PaidQuotationList,
        }));
        this.onclickCustomer = index;
        this.showQuotationListItemBoolean = 1;
        console.log('Quotation List:', this.selectedQuotationListByCustomerId);
      },
      (error) => {
        console.error('Error fetching quotation lists:', error);
      }
    );
  }

  itemsPerPage: number = 10; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number =2;  



  // Function to handle page navigation
  goToPage(direction: 'prev' | 'next'): void {
    if (direction === 'prev' && this.currentPage > 1) {
      this.currentPage--;
      
    } else if (direction === 'next' && this.currentPage < this.totalPages) {
      this.currentPage++;
    
    }
    this.apiService.fetchAllCustomerListByPage(this.currentPage).subscribe(
      (customers: Customer[]) => {
        this.selectedCustomer = customers;
        console.log('Customers:', this.selectedCustomer);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  // Function to handle input change and navigate to the specified page
  goToPageInput(): void {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.apiService.fetchAllCustomerListByPage(this.currentPage).subscribe(
      (customers: Customer[]) => {
        this.selectedCustomer = customers;
        console.log('Customers:', this.selectedCustomer);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  resetShowQuotationState() {
    // Reset the boolean state to 0
    this.showQuotationListItemBoolean = 0;
  }


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
    this.searchQuery = '';
  }

  addToQuote(_t18: any) {
    throw new Error('Method not implemented.');
  }

  empty() { }



  addCustomer() {
    // Display snackbar
    this.openSnackBar();
  }

  quotationList: any;
  searchQuotationListItem(arg0: number) {
    throw new Error('Method not implemented.');
  }

  showCustomerDetails() {
    throw new Error('Method not implemented.');
  }

  // .
}