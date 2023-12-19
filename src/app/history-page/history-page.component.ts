import { Component, Inject, OnInit } from '@angular/core';
import { DetailSidebarComponent } from '../detail-sidebar/detail-sidebar.component';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, KeyValue, KeyValuePipe } from '@angular/common';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { PartsInQuoteList, QuotationListResponse, QuotationPart, QuotationResponse } from '../models/quotation.model';
import { HttpResponse } from '@angular/common/http';
import { Pagination } from '../models/pagination.model';
@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [DetailSidebarComponent, LayoutComponent, FormsModule, CommonModule, KeyValuePipe],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent implements OnInit {
  selectedQuotationListByCustomerId: QuotationResponse[] = [];
  selectedQuotationList: any;
  pendingQuotationList: QuotationResponse[] = [];
  completedQuotationList: QuotationResponse[] = [];
  selectedCustomer: Customer[] = [];
  onclickCustomer: number = 0;
  showQuotationListItemBoolean: number = 0;
  searchQuery: string = '';
  selectedQuantity: any;
  customerListObservable: Observable<any> = of([]);
  showQuotationListDetailItemBoolean: number = 0;
  totalAmountOfQuotationList: number = 0;
  totalPage: number = 1;
  currentPage: number = 1;
  totalPageItems: number = 0;
  quotationCurrentId: number = 0;
  constructor( private apiService: ApiService) {

  }

  ngOnInit(): void {
    // Call your API service method here
    this.apiService.fetchAllCustomerListByPage(1).subscribe(
      (customers: HttpResponse<Customer[]>) => {
        this.selectedCustomer = customers.body as Customer[];
        console.log('Customers:', this.selectedCustomer);
        const pagination = customers.headers.get('X-Pagination');
        const paginationData = pagination ? JSON.parse(pagination) : null;
        this.totalPage = paginationData.TotalPageCount;
        console.log('Customers:', this.selectedCustomer);
        console.log('Pagination Data:', paginationData);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );

  }


  filteredCustomers: Customer[] = [];
  searchCustomer(customerName: string) {
    this.resetShowQuotationState();
    this.apiService.searchCustomerByName(customerName).subscribe(
      (response: HttpResponse<Customer[]>) => {
        this.selectedCustomer = response.body as Customer[];
        const pagination = response.headers.get('X-Pagination');
        const paginationData = pagination ? JSON.parse(pagination) : null;
        this.totalPage = paginationData.TotalPageCount;
        this.currentPage = paginationData.CurrentPage;
        console.log('Customers:', this.selectedCustomer);
        console.log('Pagination Data:', paginationData);
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }
  quotationCurrentPage: number = 1;
  quotationTotalPage: number = 1;
  searchQuotation(index: number, id: number): void {
    this.resetShowQuotationState();
    this.selectedQuotationListByCustomerId = [];
    this.completedQuotationList = [];
    this.pendingQuotationList = [];
    this.onclickCustomer = index;
    this.showQuotationListItemBoolean = 1;
    this.apiService.getQuotationListsByCustomerId(id, this.quotationCurrentPage).subscribe(
      (apiResponse: HttpResponse<QuotationListResponse[]>) => {
        console.log('Quotation List:', apiResponse.headers.get('X-Pagination'));
        this.selectedQuotationListByCustomerId = (apiResponse.body as any).quotationList;
        this.quotationTotalPage = (apiResponse.headers.get('X-Pagination') as any).TotalPageCount;
        for (let i = 0; i < this.selectedQuotationListByCustomerId.length; i++) {
          if (this.selectedQuotationListByCustomerId[i].status === 0) {
            console.log("Current: ", this.selectedQuotationListByCustomerId[i]);
            this.pendingQuotationList = [...this.pendingQuotationList, this.selectedQuotationListByCustomerId[i]];
            console.log('This is equal 0', this.pendingQuotationList);
          } else if (this.selectedQuotationListByCustomerId[i].status === 1) {
            console.log("Current: ", this.selectedQuotationListByCustomerId[i]);
            this.completedQuotationList = [...this.completedQuotationList, this.selectedQuotationListByCustomerId[i]];
            console.log('This is equal 1:', this.completedQuotationList);
          } else {
            console.log('This is equal nothing:',);
            console.log('Quotation List:', this.selectedQuotationListByCustomerId[i].status);
          }
        }
        this.onclickCustomer = index;
        this.showQuotationListItemBoolean = 1;
        console.log('Complete List:', this.completedQuotationList, 'pending List:', this.pendingQuotationList);
      },
      (error) => {
        console.error('Error fetching quotation lists:', error);
      }
    );
  }





  // Function to handle page navigation
  goToPage(direction: 'prev' | 'next', type: 'quote' | 'customer'): void {
    if (direction === 'prev' && this.currentPage > 1 && type === 'customer') {
      this.currentPage--;

    } else if (direction === 'next' && this.currentPage < this.totalPage && type === 'customer') {
      this.currentPage++;

    }
    else if (direction === 'prev' && this.quotationCurrentPage > 1 && type === 'quote') {
      this.quotationCurrentPage--;
    }
    else if (direction === 'next' && this.quotationCurrentPage < this.quotationTotalPage && type === 'quote') {
      this.quotationCurrentPage++;

    }
    if (type === 'customer') {
      this.apiService.fetchAllCustomerListByPage(this.currentPage).subscribe(
        (customers: HttpResponse<Customer[]>) => {
          this.selectedCustomer = customers.body as Customer[];
          console.log('Customers:', this.selectedCustomer);
        },
        (error) => {
          console.error('Error fetching customers:', error);
        }
      );
    }
    else if (type === 'quote') {
      this.searchQuotationListDetailItem(this.quotationCurrentId,this.selectedCustomer[this.onclickCustomer].customerId);
    }
  }

  // Function to handle input change and navigate to the specified page
  goToPageInput( type: 'quote' | 'customer'): void {
    if (this.currentPage < 1 && type === 'customer') {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPage && type === 'customer') {
      this.currentPage = this.totalPage;
    } 
    else if (this.quotationCurrentPage < 1 && type === 'quote') {
      this.quotationCurrentPage = 1;
    }
    else if (this.quotationCurrentPage > this.quotationTotalPage && type === 'quote') {
      this.quotationCurrentPage = this.quotationTotalPage;
    }
    if (type === 'customer') {
      this.apiService.fetchAllCustomerListByPage(this.currentPage).subscribe(
        (customers: HttpResponse<Customer[]>) => {
          this.selectedCustomer = customers.body as Customer[];
          console.log('Customers:', this.selectedCustomer);
        },
        (error) => {
          console.error('Error fetching customers:', error);
        }
      );
    }
    else if (type === 'quote') {
      this.searchQuotationListDetailItem(this.quotationCurrentId,this.selectedCustomer[this.onclickCustomer].customerId);
    }
  }

  resetShowQuotationState() {
    // Reset the boolean state to 0
    this.showQuotationListItemBoolean = 0;
    this.showQuotationListDetailItemBoolean = 0;
    this.totalAmountOfQuotationList = 0;
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

  quotationList: PartsInQuoteList[] = [];
  searchQuotationListDetailItem(quoteNo: number, customerId: number) {
    this.showQuotationListDetailItemBoolean = 1;
    this.apiService.searchQuotationListDetailItem(quoteNo, customerId, this.quotationCurrentPage).subscribe(
      (response : HttpResponse<QuotationPart[]>) => {
        this.quotationList = (response.body as any).parts; // Assuming 'parts' is the array
        const pagination = response.headers.get('X-Pagination');
        const paginationData = pagination ? JSON.parse(pagination) : null;
        this.quotationTotalPage = paginationData.TotalPageCount;
        this.quotationCurrentId = quoteNo
        console.log('Quotation List:', this.quotationTotalPage);
        console.log('Total Amount:', (response.body as any).totalAmount);

        if (this.quotationList.length === 0) {
          this.totalAmountOfQuotationList = 0;
        } else {
          this.totalAmountOfQuotationList = (response.body as any).totalAmount;
        }
      },
      (error) => {
        console.error('Error fetching quotation lists:', error);
      }
    );

  }


  showCustomerDetails() {
    this.showQuotationListDetailItemBoolean = 0;
    this.totalAmountOfQuotationList = 0;
  }

  // .
}