import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatMenuTrigger} from '@angular/material'

import { Store } from '@ngrx/store'
import {IAppState} from '../../../../store'

import {ChangeTab} from '../../../../store/actions/tab.action'
import {AddMarker} from '../../../../store/actions/map.action'


@Component({
  selector: 'app-edit-trailer',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditTrailerComponent implements OnInit {

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
  
  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
  }


}
