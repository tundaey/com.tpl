import {Component, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
import {MatMenuTrigger} from '@angular/material'
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material'
import {Observable} from 'rxjs/Observable';

import {ExampleDatabase} from '../dashboard.service'
import {DataService} from '../data.service'

declare var google: any;

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  @Input() _data: any
  @Input() _title: any
  @ViewChild('newFilterTrigger') newFilterTrigger: MatMenuTrigger;

  displayInputLine = {
    last_name: false,
    first_name: false,
    dob: false,
    mobile_phone: false,
    land_line: false,
    email: false,
    address: false,
    driver_license: false,
    cdl_exp: false,
    last_drug: false,
    phy_exp: false,
  };

  // _data = {
  //   name: 'Hello',
  //   color: 'World',
  //   date: new Date(),
  // }
  focus(value){
    this.displayInputLine[value] = true
  }

  removeFocus(value){
    this.displayInputLine[value] = false;
  }

  data: any;
  //_data: any;
  companyForm: FormGroup

  constructor(public _exampleDatabase: ExampleDatabase, private fb: FormBuilder, private dataService: DataService){
    this.data =  this._exampleDatabase.data;
    console.log('driver _data', this._data)
    this.createCompanyForm()
  }

  createCompanyForm(){
    this.companyForm = this.fb.group({
      'name': ['', Validators.required],
      'address': '',
      'phone': '',
      'fax': '',
      'open_from': '',
      'open_to': ''

    })
  }

  createCompany(){
    console.log(this.companyForm)
    this.newFilterTrigger.closeMenu();
  }

  closeNewMenu(){
    this.newFilterTrigger.closeMenu();
  }

  orders = [
    {type: 'Order', id: 10253, dispatcher: "Pawel Kowalski"},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  order = {type: 'Order', id: 10253, dispatcher: "Pawel Kowalski"}

  myControl = new FormControl();
  
  filteredOptions: Observable<any>;
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
        .startWith(null)
        .map(user => user && typeof user === 'object' ? user.name : user)
        .map(name => name ? this.filter(name) : this.data.slice());
  }
  
  filter(name: string) {
    return this.data.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
  displayFn(user): string {
    return user ? user : '';
  }

  addOption(option){
    console.log('add option', option)
    //this.newFilterTrigger.openMenu()
  }

tiles = [
  {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
  {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
  {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
];

  

  
}
