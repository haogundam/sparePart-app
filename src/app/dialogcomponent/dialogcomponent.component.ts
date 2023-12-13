import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { Component } from "@angular/core";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogActions } from "@angular/material/dialog";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    standalone: true,
    selector: 'app-dialogcomponent',
    templateUrl: 'dialogcomponent.component.html',
    styleUrls: ['dialogcomponent.component.css'],
    imports : [MatInputModule,MatDialogActions,MatDialogModule,MatDialogRef],
  })

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}