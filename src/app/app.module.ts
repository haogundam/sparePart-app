import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
@NgModule({
  declarations: [
    // ... your components
    RegistrationDialogComponent
  ],
  imports: [
     // Add this line
    // ... other modules
    ReactiveFormsModule, FormsModule, MatDialogModule,
  ],
  bootstrap: [],
})
export class AppModule {}
