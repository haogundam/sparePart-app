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
  categoryName: string;
  partName: string;
  quantityLeft: number;
  price: number;
  warehouse: string;
  createDate:string;
  validDate:string;
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
  quotationList: QuotationListItem[] = [
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' ,createDate:'2020-12-12',validDate:'2020-12-12'}, 
    // Add more items as needed
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

  search() {
    this.openSnackBar();
  }
  
  
  // Modify the viewQuote method
  viewQuote(customer: Customer) {
    this.openSnackBar();

  }
  empty(){
  }
  searchQuery: any;
  selectedQuantity: any;

}
