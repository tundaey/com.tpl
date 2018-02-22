import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatMenuTrigger} from '@angular/material'

@Component({
  selector: 'app-edit-truck',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditTruckComponent implements OnInit {
  @Input() _data: any
  @Input() _title: any
  @ViewChild('newFilterTrigger') newFilterTrigger: MatMenuTrigger;

  displayInputLine = {
    unit: false,
    vin: false,
    year: false,
    make: false,
    model: false,
    miles: false,
    gross: false,
    fed_inspection: false,
  };
  focus(value){
    this.displayInputLine[value] = true
  }

  removeFocus(value){
    this.displayInputLine[value] = false;
  }

  constructor() { 
    console.log('truck', this._data)
  }

  ngOnInit() {
  }

}
