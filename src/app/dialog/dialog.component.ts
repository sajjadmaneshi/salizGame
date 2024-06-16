import {Component, Inject} from '@angular/core';
import {MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {DIALOG_DATA} from "@angular/cdk/dialog";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogClose,
    NgClass
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(@Inject(DIALOG_DATA) public data:boolean=true) {
  }
}
