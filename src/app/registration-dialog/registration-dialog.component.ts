import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from '../services/data.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { MatDialog, MatDialogActions,
  MatDialogClose,MatDialogContent,MatDialogTitle,} from '@angular/material/dialog';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss'],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule],
  standalone: true,
})

export class RegistrationDialogComponent {

  
  // registrationForm  : FormGroup = this.fb.group({
  //   name: ['', Validators.required],
  //   contact: ['', Validators.required],
  //   email: ['', [Validators.required, Validators.email]],
  //   address1: ['', Validators.required],
  //   address2: [''],
  // });;

  // constructor(
  //   private fb: FormBuilder,
  //   private dataService: DataService,
  //   private snackBar: MatSnackBar
  // ) {}

  // ngOnInit(): void {
  //   this.registrationForm = this.fb.group({
  //     name: ['', Validators.required],
  //     contact: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     address1: ['', Validators.required],
  //     address2: [''],
  //   });
  // }

  registerCustomer(): void {
    // if (this.registrationForm.valid) {
    //   const customerData = this.registrationForm.value;
    //   this.dataService.registerCustomer(customerData).subscribe(
    //     (response) => {
    //       console.log('Registration successful:', response);
    //       this.snackBar.open('Registration successful!', 'Close', {
    //         duration: 3000,
    //       });
    //       this.registrationForm.reset();
    //     },
    //     (error) => {
    //       console.error('Registration failed:', error);
    //       this.snackBar.open('Registration failed. Please try again.', 'Close', {
    //         duration: 3000,
    //       });
    //     }
    //   );
    // } else {
    //   this.snackBar.open('Please fill in all required fields.', 'Close', {
    //     duration: 3000,
    //   });
    // }
  }
}