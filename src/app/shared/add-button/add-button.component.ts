import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {AddDriverDialog} from '../dialog/driver/add-driver'
import {AddClientDialog} from '../dialog/client/add-client'
import {AddTruckDialog} from '../dialog/truck/add-truck'
import {AddTrailerDialog} from '../dialog/trailer/add-trailer'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {
  @Input() text: string;
  @Input() disabled: boolean;
  name: "Tunde"
  animal: "Dog"

  constructor(public dialog: MatDialog){}

  openDialog(dialog): void {
    let dialogRef = this.dialog.open(dialog, {
      width: '600px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openClientDialog(): void {
    this.openDialog(AddClientDialog)
  }

  openDriverDialog(): void {
    this.openDialog(AddDriverDialog)
  }

  openTruckDialog(): void {
    this.openDialog(AddTruckDialog)
  }

  openTrailerDialog(): void {
    this.openDialog(AddTrailerDialog)
  }


}
