import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import {Observable, of} from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Customer } from '../models/customer.model';
import { MatDialog, MatDialogActions,
  MatDialogClose,MatDialogContent,MatDialogTitle,} from '@angular/material/dialog';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { startWith, map } from 'rxjs';

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


interface FilteredOptions{
  sku:number;
  name:string;
  partId:number;
  unitPrice:number;
}

@Component({
  selector: 'app-quotation-sidebar',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule,
    MatInputModule, MatAutocompleteModule,
    ReactiveFormsModule, AsyncPipe, DialogComponent,
    MatDialogModule, MatButtonModule
  ],
  templateUrl: './quotation-sidebar.component.html',
  styleUrls: ['./quotation-sidebar.component.scss'],
})

// implements OnInit
export class QuotationSidebarComponent implements OnInit{
// filteredOption: FilteredOptions[]= [
//   {sku:1234,name:"Joseph",partId:1234,unitPrice:22.32},]

// ;
 
  openModal(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private _model: any;
  onDeleteClick() {
    throw new Error('Method not implemented.');
  }


  // customerSearch: string = '';
  // customer: Customer[] = [];

  constructor(private apiService : ApiService, public dialog: MatDialog) {
    
  }

// onSearch() {
//   if (this.customerSearch.trim() !== '') {
//     this.apiService.searchCustomerByName(this.customerSearch).subscribe(
//       (customers : Customer[]) =>
//     {
//       this.customer = customers;
//     },
//     (error) => {
//       console.error('Error fetching customer', error);
//       console.log('Customer Name:', this.customer)
//     }
//     );
//   }
// }

//register customer
openRegistrationForm():void {
  const dialogRef = this.dialog.open(RegistrationDialogComponent, {
    width: '700px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The registration dialog was closed',result);
  });
 }


 //autocomplete
 myControl = new FormControl<string | User>('');
 options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
 filteredOptions!: Observable<User[]>;

 ngOnInit() {
   this.filteredOptions = this.myControl.valueChanges.pipe(
     startWith(''),
     map(value => {
       const name = typeof value === 'string' ? value : value?.name;
       return name ? this._filter(name as string) : this.options.slice();
     }),
   );
 }

 displayFn(user: User): string {
   return user && user.name ? user.name : '';
 }

 private _filter(name: string): User[] {
   const filterValue = name.toLowerCase();

   return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
 }

}
