import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';
import { createCustomerRequest, registerCustomerProfile } from '../models/customer.model';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
})

export class RegistrationDialogComponent {
  registrationForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    contact: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address1: ['', Validators.required],
    address2: [''],
  });

  constructor(private fb: FormBuilder, private apiService: ApiService) {}


  
  registerCustomer(): void {
    if (this.registrationForm.valid) {
      const { name, contact, email, address1, address2 } = this.registrationForm.value;
      const formattedAddress = `${address1} ${address2}`.trim();

      const requestData: registerCustomerProfile = {
        CustomerName : name,
        CustomerContact: contact,
        CustomerEmail: email,
        CustomerAddress: formattedAddress,
        
      };
      console.log(requestData)
      

      this.apiService.registerCustomer(requestData).subscribe(
        (response: HttpResponse<registerCustomerProfile[]>) => {
          console.log('Registration successful:', response);
          // Handle success (e.g., show a success message)
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle error (e.g., show an error message using MatSnackBar)
        }
      );
    } else {
      // Form is invalid, handle accordingly (optional)
    }
  }
}