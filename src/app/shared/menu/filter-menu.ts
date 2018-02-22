import {Component, Inject, OnInit, Input, ViewChild} from '@angular/core';
import {MatMenuTrigger, MatDatepicker, MatMenuPanel, MatTable} from '@angular/material';

import { Store } from '@ngrx/store';
import { IAppState } from '../../store/index';

import { Observable } from 'rxjs/Observable';

export const LAST_NAME_FILTER ="Last Name Filter"


@Component({
    selector: 'filter-menu',
    templateUrl: 'filter-menu.html',
  })
  export class FilterMenu implements OnInit {
    @ViewChild('nameFilterTrigger') nameFilterTrigger: MatMenuTrigger;

    @Input() dataSource
    @Input() selectedOptions
    @Input() addToFilterBar
    @Input() removeFilterOption
    @Input() trigger
    @Input() title
    @Input() filterType
    @Input() column
    @Input() reducer
  
    constructor(private store: Store<IAppState>) {
        console.log('filter type', this.filterType)
        
    }
    
    ngOnInit(){
        
    }

    colorOptions = [
        {value: 'contains', viewValue: 'contains'},
        {value: 'does not contains', viewValue: 'does not contains'},
        {value: 'equals', viewValue: 'equals'}
    ];

    selectedColorOption = 'contains';

    closeFilter(){
        this.trigger.closeMenu()
    }

    applyFilter(nameFilterInput, selectedOption){
        
        let stringToBeFiltered = ''
        let selected = selectedOption.value === undefined ? 'contains' : selectedOption.value
       
        if(selected === "does not contains") stringToBeFiltered = `-${nameFilterInput.value}`
    
        let value = `${this.filterType} ${selected} ${nameFilterInput.value}`
        console.log('selcted option', selectedOption.value)

        const condition = selectedOption.value || "contains"
        this.reducer(nameFilterInput.value, condition);
        this.addToFilterBar(value)    
    
        this.trigger.closeMenu()
        nameFilterInput.value = ""
        //this.removeFilterOption()
    }

  
  
  }