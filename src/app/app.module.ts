import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationDialogModule } from './registration-dialog/registration-dialog.module';
@NgModule({
  declarations: [
    // ... your components
  ],
  imports: [
     // Add this line
    // ... other modules
    ReactiveFormsModule, FormsModule, MatDialogModule, RegistrationDialogModule
  ],
  bootstrap: [],
})
export class AppModule {}
