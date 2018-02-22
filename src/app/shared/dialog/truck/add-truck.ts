import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatStepper} from '@angular/material'
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/index';
import { Observable } from 'rxjs/Observable';
import { createTruck } from '../../../store/actions/truck.action'

@Component({
    selector: 'add-truck-dialog',
    templateUrl: 'add-truck.html',
  })
  export class AddTruckDialog implements OnInit {
      driverForm: FormGroup;
      truckInfoForm: FormGroup;
      truckDetailsForm: FormGroup;
      isLinear: boolean = true;
      client$: Observable<{}>;
      isFetching: boolean;
      error: string;
      isError: boolean = false
  
    constructor(
      public dialogRef: MatDialogRef<AddTruckDialog>,private fb: FormBuilder,
      public store: Store<IAppState>,
      @Inject(MAT_DIALOG_DATA) public data: any) 
      {
          this.createForm();
          this.store.select((state)=> state.trucks.error).subscribe((error)=>{
            this.isError = true
            this.error = error              
        })
          
       }
    
    ngOnInit(){
        this.filteredOptions = this.myControl.valueChanges
        .startWith(null)
        .map(user => user && typeof user === 'object' ? user.name : user)
        .map(name => name ? this.filter(name) : this.autocomplete_data.slice());
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    closePanel(auto){
        auto.closePanel()
    }

    createForm(){
        this.truckInfoForm = this.fb.group({
            'unit_no': '',
            'year': '',
            'make': '',
            'model': '',
        })

        this.truckDetailsForm = this.fb.group({
            'vin': '',
            'miles': '',
            'gross_wgt': '',
            'fed_inspection': '',
        })


    }

    submitForm(stepper: MatStepper){
        const submittedForm = Object.assign(
            {}, this.truckInfoForm.value, 
            {enable: true},
            {checked:false},
            this.truckDetailsForm.value) 
        
        
        this.store.select('trucks').dispatch(new createTruck(submittedForm))
        this.closeForm()
         
    }

    closeForm(){
        this.dialogRef.close()
    }

    autocomplete_data: any;
    myControl = new FormControl();

    orders = [
        {type: 'Order', id: 10253, dispatcher: "Pawel Kowalski"},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
      ];

    filteredOptions: Observable<any>;
    filter(name: string) {
        return this.autocomplete_data.filter(option =>
          option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
      
    displayFn(user): string {
    return user ? user : '';
    }
    
    addOption(option){
    console.log('add option', option)
    //this.newFilterTrigger.openMenu()
    }

    timeOptions = [
        "12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM","8AM", "9AM", "10AM", "11AM", "12 NOON",
        "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM","8PM", "9PM", "10PM", "11PM"
    ]

    terms = [ "15 Days", "30 Days", "45 Days" ]
  
  }