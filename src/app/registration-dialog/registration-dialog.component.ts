import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../services/data.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';
import { Customer, createCustomerRequest, registerCustomerProfile } from '../models/customer.model';
import { MatDialog, MatDialogActions,
  MatDialogClose,MatDialogContent,MatDialogTitle,} from '@angular/material/dialog';
@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
})


export class RegistrationDialogComponent{

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address1: ['', Validators.required],
      address2: [''],
    });
  }

  registrationForm!: FormGroup;


  ngOnInit(): void {
    
  }

  registerCustomer(): void {
    if (this.registrationForm.valid) {
      const requestData = this.registrationForm.value;
      // Assuming ApiService has a method named registerCustomer
      this.apiService.registerCustomer(requestData).subscribe(
        (response: createCustomerRequest[]) => {
          console.log('Registration successful:', response);
          // Handle success (e.g., show a success message)
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle error (e.g., show an error message)
        }
      );
    } else {
      // Form is not valid, handle accordingly (e.g., show validation errors)
    }
  }
  
}