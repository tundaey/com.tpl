import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatMenuTrigger} from '@angular/material'

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditClientComponent implements OnInit {
  @Input() _data: any
  @Input() _title: any
  @ViewChild('newFilterTrigger') newFilterTrigger: MatMenuTrigger;

  displayInputLine = {
    customer_name: false,
    first_name: false,
    last_name: false,
    from: false,
    to: false,
    invoice_terms: false,
    mobile_phone: false,
    land_line: false,
    email: false,
    address: false,
    billing_address: false,
  };
  focus(value){
    this.displayInputLine[value] = true
  }

  removeFocus(value){
    this.displayInputLine[value] = false;
  }

  //placeholder for date elements
  date= new Date();

  // placeholder for select options for "from" and "to"
  timeOptions = [
    "12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM","8AM", "9AM", "10AM", "11AM", "12 NOON",
    "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM","8PM", "9PM", "10PM", "11PM"
  ]

  terms = [ "15 Days", "30 Days", "45 Days" ]

  constructor() {
   }

  ngOnInit() {
    console.log('_data init', this._data)
  }

}
