import { Component, Inject, OnInit } from '@angular/core';
import { DetailSidebarComponent } from '../detail-sidebar/detail-sidebar.component';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, KeyValue, KeyValuePipe } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { PartsInQuoteList, QuotationListResponse, QuotationPart, QuotationResponse } from '../models/quotation.model';
import { HttpResponse } from '@angular/common/http';
import { Pagination } from '../models/pagination.model';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [DetailSidebarComponent, LayoutComponent, FormsModule, CommonModule, KeyValuePipe],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
export class HistoryPageComponent implements OnInit {
  selectedPaidQuotationListByCustomerId: QuotationListResponse[] = [];
  selectedPendingQuotationListByCustomerId: QuotationListResponse[] = [];
  selectedQuotationList: any;
  pendingQuotationList: QuotationResponse[] = [{ quoteNo: 0, quoteDate: '123', quoteValidDate: '123' }];
  completedQuotationList: QuotationResponse[] = [];
  selectedCustomer: Customer[] = [

  ];
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
  pendingListIndicator: number = 0;
  completedListIndicator: number = 0;
  constructor(private apiService: ApiService, private router: Router, private sharedDataService: SharedDataService) {

  }

  ngOnInit(): void {
    // Call your API service method here
    this.apiService.fetchAllCustomerListByPage(1, '').subscribe(
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
    console.log(this.pendingQuotationList);
    console.log(this.pendingQuotationList.length);
  }


  filteredCustomers: Customer[] = [];
  searchCustomer(customerName: string) {
    this.resetShowQuotationState();
    this.apiService.searchCustomerByName(customerName, this.currentPage).subscribe(
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
  searchCustomerOnSearchBar(customerName: string) {
    this.resetShowQuotationState();
    this.currentPage = 1;
    this.apiService.searchCustomerByName(customerName, this.currentPage).subscribe(
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
  pendingQuotationCurrentPage: number = 1;
  completedQuotationCurrentPage: number = 1;
  pendingQuotationTotalPage: number = 1;
  completedQuotationTotalPage: number = 1;
  detailQuotationTotalPage: number = 1;
  detailQuotationCurrentPage: number = 1;
  searchQuotation(index: number, id: number, pageNumber?: number): void {
    this.resetShowQuotationState();
    this.selectedPaidQuotationListByCustomerId = [];
    this.selectedPendingQuotationListByCustomerId = [];
    this.completedQuotationList = [];
    this.pendingQuotationList = [];
    this.onclickCustomer = index;
    this.showQuotationListItemBoolean = 1;

    this.apiService.getQuotationListsByCustomerId(id, pageNumber ?? 1, 1).subscribe(
      (apiResponse: HttpResponse<QuotationListResponse[]>) => {
        console.log('Paid Quotation List Pagination:', apiResponse.headers.get('Paid-Pagination'));
        console.log('Pending Quotation List Pagination:', apiResponse.headers.get('Pending-Pagination'));
        console.log('Response:', apiResponse.body);

        const paidPaginationHeader = apiResponse.headers.get('Paid-Pagination');
        if (paidPaginationHeader !== null) {
          const paidPaginationData = JSON.parse(paidPaginationHeader);
          console.log('Paid Pagination Data:', paidPaginationData);

          if (paidPaginationData !== null) {
            this.completedQuotationTotalPage = paidPaginationData.TotalPageCount;
            this.completedQuotationList = (apiResponse.body as any).paidQuotationList;
            console.log('Paid Quotation List:', this.completedQuotationList);
          } else {
            this.completedListIndicator = 1;

            console.error('Paid pagination data is null');
          }
        } else {
          // Handle the case where the header might not be present
          this.completedListIndicator = 1;
          console.error('Paid-Pagination header is missing');
        }

        const pendingPaginationHeader = apiResponse.headers.get('Pending-Pagination');
        if (pendingPaginationHeader !== null) {
          const pendingPaginationData = JSON.parse(pendingPaginationHeader);
          console.log('Pending Pagination Data:', pendingPaginationData);

          if (pendingPaginationData !== null) {
            this.pendingQuotationTotalPage = pendingPaginationData.TotalPageCount;
            this.pendingQuotationList = (apiResponse.body as any).pendingQuotationList;
            console.log('Pending Quotation List:', this.pendingQuotationList);
          } else {
            this.pendingListIndicator = 1;
            console.error('Pending pagination data is null');
          }
        } else {
          // Handle the case where the header might not be present
          console.error('Pending-Pagination header is missing');
        }


        // for (let i = 0; i < this.selectedQuotationListByCustomerId.length; i++) {
        //   if (this.selectedQuotationListByCustomerId[i].status === 0) {
        //     console.log("Current: ", this.selectedQuotationListByCustomerId[i]);
        //     this.pendingQuotationList = [...this.pendingQuotationList, this.selectedQuotationListByCustomerId[i]];
        //     console.log('This is equal 0', this.pendingQuotationList);
        //   } else if (this.selectedQuotationListByCustomerId[i].status === 1) {
        //     console.log("Current: ", this.selectedQuotationListByCustomerId[i]);
        //     this.completedQuotationList = [...this.completedQuotationList, this.selectedQuotationListByCustomerId[i]];
        //     console.log('This is equal 1:', this.completedQuotationList);
        //   } else {
        //     console.log('This is equal nothing:',);
        //     console.log('Quotation List:', this.selectedQuotationListByCustomerId[i].status);
        //   }
        // }
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
  goToPage(direction: 'prev' | 'next', type: 'quote' | 'customer' | 'pending' | 'complete' | 'detail'): void {
    if (direction === 'prev' && this.currentPage > 1 && type === 'customer') {
      this.currentPage--;
      this.searchCustomer(this.searchQuery);

    } else if (direction === 'next' && this.currentPage < this.totalPage && type === 'customer') {
      this.currentPage++;
      this.searchCustomer(this.searchQuery);

    }
    else if (direction === 'prev' && this.quotationCurrentPage > 1 && type === 'quote') {
      this.quotationCurrentPage--;
    }
    else if (direction === 'next' && this.quotationCurrentPage < this.quotationTotalPage && type === 'quote') {
      this.quotationCurrentPage++;

    }
    else if (direction === 'prev' && this.detailQuotationCurrentPage > 1 && type === 'detail') {

      this.detailQuotationCurrentPage--;
      }
    else if (direction === 'next' && this.detailQuotationCurrentPage < this.detailQuotationTotalPage && type === 'detail') {

      this.detailQuotationCurrentPage++;

    }

    else if (direction === 'prev' && this.pendingQuotationCurrentPage > 1 && type === 'pending') {
      this.pendingQuotationCurrentPage--;
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, this.pendingQuotationCurrentPage, 1).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.pendingQuotationList = (apiResponse.body as any).pendingQuotationList;
        });
    }

    else if (direction === 'next' && this.pendingQuotationCurrentPage < this.pendingQuotationTotalPage && type === 'pending') {
      this.pendingQuotationCurrentPage++;
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, this.pendingQuotationCurrentPage, 1).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.pendingQuotationList = (apiResponse.body as any).pendingQuotationList;
        });
    }
    else if (direction === 'prev' && this.completedQuotationCurrentPage > 1 && type === 'complete') {
      this.completedQuotationCurrentPage--;
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, 1, this.completedQuotationCurrentPage).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.completedQuotationList = (apiResponse.body as any).paidQuotationList;
        });
    }
    else if (direction === 'next' && this.completedQuotationCurrentPage < this.completedQuotationTotalPage && type === 'complete') {
      this.completedQuotationCurrentPage++;
      console.log('Current Page:', this.completedQuotationCurrentPage);
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, 1, this.completedQuotationCurrentPage).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.completedQuotationList = (apiResponse.body as any).paidQuotationList;
        });
    }
    if (type === 'customer') {
      this.apiService.fetchAllCustomerListByPage(this.currentPage, this.searchQuery).subscribe(
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
      this.searchQuotationListDetailItem(this.quotationCurrentId, this.selectedCustomer[this.onclickCustomer].customerId);
    }
    else if (type ==="detail") {
      this.searchQuotationListDetailItem(this.quotationCurrentId, this.selectedCustomer[this.onclickCustomer].customerId);
    }
  }

  // Function to handle input change and navigate to the specified page
  goToPageInput(type: 'quote' | 'customer' | 'pending' | 'complete' | 'detail'): void {
    if (this.currentPage < 1 && type === 'customer') {
      this.currentPage = 1;
      this.searchCustomer(this.searchQuery);

    } else if (this.currentPage > this.totalPage && type === 'customer') {
      this.currentPage = this.totalPage;
      this.searchCustomer(this.searchQuery);

    }
    else if (this.quotationCurrentPage < 1 && type === 'quote') {
      this.quotationCurrentPage = 1;
    }
    else if (this.quotationCurrentPage > this.quotationTotalPage && type === 'quote') {
      this.quotationCurrentPage = this.quotationTotalPage;
    }
    if (type === 'customer') {
      this.apiService.fetchAllCustomerListByPage(this.currentPage, this.searchQuery).subscribe(
        (customers: HttpResponse<Customer[]>) => {
          this.selectedCustomer = customers.body as Customer[];
          console.log('Customers:', this.selectedCustomer);
        },
        (error) => {
          console.error('Error fetching customers:', error);
        }
      );
    }
    if (type === 'quote') {
      this.searchQuotationListDetailItem(this.quotationCurrentId, this.selectedCustomer[this.onclickCustomer].customerId);
    }

    if (this.pendingQuotationCurrentPage > this.pendingQuotationTotalPage && type === 'pending') {
      this.pendingQuotationCurrentPage = this.pendingQuotationTotalPage;
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, this.pendingQuotationCurrentPage, 1).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.pendingQuotationList = (apiResponse.body as any).pendingQuotationList;
        });
    }
    else if (this.pendingQuotationCurrentPage < 1 && type === 'pending') {
      this.pendingQuotationCurrentPage = 1;
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, this.pendingQuotationCurrentPage, 1).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.pendingQuotationList = (apiResponse.body as any).pendingQuotationList;
        });
    }

    if (type === 'pending') {
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, this.pendingQuotationCurrentPage, 1).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.pendingQuotationList = (apiResponse.body as any).pendingQuotationList;
        });
    }
    else if (this.completedQuotationCurrentPage > this.completedQuotationTotalPage && type === 'complete') {
      this.completedQuotationCurrentPage = this.completedQuotationTotalPage;
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, 1, this.completedQuotationCurrentPage).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.completedQuotationList = (apiResponse.body as any).paidQuotationList;
        });
    }
    else if (this.completedQuotationCurrentPage < 1 && type === 'complete') {
      this.completedQuotationCurrentPage = 1;
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, 1, this.completedQuotationCurrentPage).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.completedQuotationList = (apiResponse.body as any).paidQuotationList;
        });
    }
    else if (type === 'detail' && this.detailQuotationCurrentPage > this.detailQuotationTotalPage) {
      this.detailQuotationCurrentPage = this.detailQuotationTotalPage;
    }
    else if (type === 'detail' && this.detailQuotationCurrentPage < 1) {
      this.detailQuotationCurrentPage = 1;
    }
    else if (type === 'detail') {
      this.searchQuotationListDetailItem(this.quotationCurrentId, this.selectedCustomer[this.onclickCustomer].customerId);
    }
    if (type === 'complete') {
      this.apiService.getQuotationListsByCustomerId(this.selectedCustomer[this.onclickCustomer].customerId, 1, this.completedQuotationCurrentPage).subscribe(
        (apiResponse: HttpResponse<QuotationListResponse[]>) => {
          this.completedQuotationList = (apiResponse.body as any).paidQuotationList;
        });
    }

  }

  resetShowQuotationState() {
    // Reset the boolean state to 0
    this.showQuotationListItemBoolean = 0;
    this.showQuotationListDetailItemBoolean = 0;
    this.totalAmountOfQuotationList = 0;
    this.pendingListIndicator = 0;
    this.completedListIndicator = 0;
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
  searchQuotationListDetailItem(quoteNo: number, customerId: number, pageNumber?: number) {
    this.showQuotationListDetailItemBoolean = 1;
    this.apiService.searchQuotationListDetailItem(quoteNo, customerId, this.detailQuotationCurrentPage).subscribe(
      (response: HttpResponse<QuotationPart[]>) => {
        this.quotationList = (response.body as any).parts; // Assuming 'parts' is the array
        const pagination = response.headers.get('X-Pagination');
        const paginationData = pagination ? JSON.parse(pagination) : null;
        this.detailQuotationTotalPage = paginationData.TotalPageCount;
        this.quotationCurrentId = quoteNo
        console.log('Quotation List:', this.detailQuotationTotalPage);
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

  editQuote(quoteId: number, customerId: number) {

    this.router.navigate(['/quotation', quoteId, customerId]);
    this.sharedDataService.changeQuotationId(quoteId);
    console.log('Quotation edit :', quoteId, customerId);
    this.sharedDataService.changeCustomerId(customerId);

  }

  showCustomerDetails() {
    this.showQuotationListDetailItemBoolean = 0;
    this.totalAmountOfQuotationList = 0;
  }

  // .
}