import { MatSnackBar } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    // ... your components
  ],
  imports: [
     // Add this line
    // ... other modules
    ReactiveFormsModule, FormsModule, MatDialogModule,
  ],
  bootstrap: [],
})
export class AppModule {}
