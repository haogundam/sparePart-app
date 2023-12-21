import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  selector: 'app-detail-sidebar',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './detail-sidebar.component.html',
  styleUrl: './detail-sidebar.component.scss'
})
export class DetailSidebarComponent {
  openModal(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private _model: any;
  onDeleteClick() {
    throw new Error('Method not implemented.');
  }
  quotationList: QuotationListItem[] = [
    { categoryName: 'Category 1', partName: 'Michenllin Fire Tyre', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 1', partName: 'Michenllin Fire Tyre', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 1', partName: 'Michenllin Fire Tyre', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 1', partName: 'Michenllin Fire Tyre', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 1', partName: 'Michenllin Fire Tyre', quantityLeft: 10, price: 50, warehouse: 'Warehouse A' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' },
    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' }, 

    { categoryName: 'Category 2', partName: 'Impressi ', quantityLeft: 20, price: 75, warehouse: 'Warehouse B' }, 


    // Add more items as needed
  ];

  mockupCustomers: Customer[] = [
    { customer_id: 12323, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
    { customer_id: 22323, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
    { customer_id: 33333, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-123-4567' },
    // Add more customers as needed
  ];

  constructor() {
  }
}
