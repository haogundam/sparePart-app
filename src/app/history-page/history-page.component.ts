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
      customerId: 12323,
      userId: 201,
      totalAmount: 500.00,
      paymentType: 'Credit Card',
      paymentStatus: 'Pending'
    },
    {
      quoteNo: 200,
      quoteDate: '2023-01-02',
      quoteValidDate: '2023-01-12',
      customerId: 22323,
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
   
  ];

  mockupCustomers: Customer[] = [
    { customer_id: 12323, name: 'John Doe', email: 'john.doe@example.com', phone: '012-345 6789' },
    { customer_id: 22323, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '012-345 6789' },
    { customer_id: 33333, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '012-345 6789' },
    { customer_id: 12323, name: 'John Doe', email: 'john.doe@example.com', phone: '012-345 6789' },
    { customer_id: 22323, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '012-345 6789' },
    { customer_id: 33333, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '012-345 6789' },
    { customer_id: 12323, name: 'John Doe', email: 'john.doe@example.com', phone: '012-345 6789' },
    { customer_id: 22323, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '012-345 6789' },
    { customer_id: 33333, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '012-345 6789' },
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
  selectedCustomer: Customer[] = [];
  selectedQuotation: QuotationListItem[] = [];
  selectedQuotationList: QuotationList[] = [];
  searchCustomer() {
    // Filter customers based on searchQuery
    this.selectedCustomer = this.mockupCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );


    // Display snackbar
    this.openSnackBar();
  }

  searchQuotation(id: number) {
    // Filter quotations based on searchQuery
    this.selectedQuotationList = this.quotationList.filter(
      (quotation) =>
        quotation.customerId === id
    );
    // Display snackbar
    this.openSnackBar();
  }

  // Modify the viewQuote method
  viewQuote(customer: Customer) {
    // Implement logic for viewing quote
    this.openSnackBar();
  }

  empty() {}

  searchQuery: any;
  selectedQuantity: any;
  
  // Modify the viewQuote method

  
 
}
