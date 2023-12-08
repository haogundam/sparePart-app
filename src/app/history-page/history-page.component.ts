import { Component,Inject } from '@angular/core';
import { DetailSidebarComponent } from '../detail-sidebar/detail-sidebar.component';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
interface QuotationListItem {
  // Define the properties of a quotation list item
  quoteNo: number;
  categoryName: string;
  partName: string;
  quantityLeft: number;
  price: number;
  warehouse: string;
  createDate:string;
  validDate:string;
}
interface QuotationList {
  quoteNo: number;
  quoteDate: string; // Assuming a string for simplicity, you can use Date type if needed
  quoteValidDate: string;
  customerId: number;
  userId: number;
  totalAmount: number;
  paymentType: string;
  paymentStatus: string;
}

interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone: string;
}
@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [DetailSidebarComponent, LayoutComponent, FormsModule, CommonModule],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.scss'
})
 
export class HistoryPageComponent {
  quotationList: QuotationList[] = [
    {
      quoteNo: 100,
      quoteDate: '2023-01-01',
      quoteValidDate: '2023-01-10',
      customerId: 11111,
      userId: 201,
      totalAmount: 500.00,
      paymentType: 'Credit Card',
      paymentStatus: 'Pending'
    },
    {
      quoteNo: 200,
      quoteDate: '2023-01-02',
      quoteValidDate: '2023-01-12',
      customerId: 33333,
      userId: 202,
      totalAmount: 750.50,
      paymentType: 'Cash',
      paymentStatus: 'Paid'
    },
    {
      quoteNo: 300,
      quoteDate: '2023-01-02',
      quoteValidDate: '2023-01-12',
      customerId: 55555,
      userId: 202,
      totalAmount: 750.50,
      paymentType: 'Cash',
      paymentStatus: 'Paid'
    },
    // Add more sample quotations as needed
  ];
  quotationListItem: QuotationListItem[] = [
    { quoteNo:100,categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    { quoteNo:200,categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 

    { quoteNo:200,categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 

  ];

  mockupCustomers: Customer[] = [
    { customer_id: 11111, name: 'John Doe', email: 'john.doe@example.com', phone: '012-345 6789' },
    { customer_id: 22222, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '012-345 6789' },
    { customer_id: 33333, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '012-345 6789' },
    { customer_id: 44444, name: 'John Doe', email: 'john.doe@example.com', phone: '012-345 6789' },
    { customer_id: 55555, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '012-345 6789' },
    { customer_id: 66666, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '012-345 6789' },
    { customer_id: 77777, name: 'John Doe', email: 'john.doe@example.com', phone: '012-345 6789' },
    { customer_id: 88888, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '012-345 6789' },
    { customer_id: 99999, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '012-345 6789' },
  ];

  constructor(private snackBar: MatSnackBar) { 
  }
  addToQuote(_t18: any) {
    throw new Error('Method not implemented.');
  }

  openSnackBar() {
    const x = document.getElementById("snackbar");

    if (x) {
      // Add the "show" class to DIV
      x.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(function() {
        if (x) {
          x.className = x.className.replace("show", "");
        }
      }, 3000);
    }
    this.searchQuery = '';
  }
  selectedCustomer: Customer[] = [
   
  ];
  selectedQuotationList: QuotationList[] = [];
  searchCustomer() {
    // Filter customers based on searchQuery
    this.selectedCustomer = this.mockupCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );


    
  }

  onclickCustomer: number = 0;
  searchQuotation(id: number,index: number) {
    // Filter quotations based on searchQuery
    console.log('Quotation List:', this.quotationList);

    this.selectedQuotationList = this.quotationList.filter(quotationList => quotationList.customerId === id);
    console.log('Selected Quotation List:', this.selectedQuotationList);

    this.onclickCustomer = index;
    console.log('searchQuotation called with customerId:', id);
  }

  showQuotationListItemBoolean: number = 0;


  selectedQuotation: QuotationListItem[] =[

  ];
  searchQuotationListItem(no : number) {
    console.log('Quotation List Items:', this.quotationListItem);

    // Filter quotation list items based on the selected customer ID
    this.selectedQuotation = this.quotationListItem.filter(quotationListItem => quotationListItem.quoteNo === no);
  
    console.log('Selected Quotation Item:', this.selectedQuotation);
     this.showQuotationListItemBoolean = 1;
     console.log('searchQuotationListItem called with quotationId:', no,'boolean',this.showQuotationListItemBoolean);
  }
  showCustomerDetails(){
    this.showQuotationListItemBoolean = 0;
  }



  addCustomer(){
        // Display snackbar
        this.openSnackBar();
  }
  // Modify the viewQuote method


  empty() {}

  searchQuery: any;
  selectedQuantity: any;
  
  // Modify the viewQuote method

  
 
}
