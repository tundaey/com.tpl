import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatStepper} from '@angular/material'
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/index';
import { createDriver } from '../../../store/actions/drivers.action'

import { Observable } from 'rxjs/Observable';

import {ExampleDatabase} from '../../../dashboard/dashboard.service'

@Component({
    selector: 'add-driver-dialog',
    templateUrl: 'add-driver.html',
  })
  export class AddDriverDialog implements OnInit {
      driverForm: FormGroup;
      basicInfoForm: FormGroup;
      contactForm: FormGroup;
      licenseForm: FormGroup;
      isLinear: boolean = true;
      driver$: Observable<{}>;
      isFetching: boolean;
      error: string;
      isError: boolean = false
  
    constructor(
      public dialogRef: MatDialogRef<AddDriverDialog>,private fb: FormBuilder,
      public _exampleDatabase: ExampleDatabase,
      public store: Store<IAppState>,
      @Inject(MAT_DIALOG_DATA) public data: any) 
      {
          this.createForm();
          this.autocomplete_data = this._exampleDatabase.data
          this.store.select((state)=> state.drivers).subscribe(({error, loading})=>{
              this.isError = true
              this.error = error   
              this.isFetching = loading        
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
        this.basicInfoForm = this.fb.group({
            'last_name': ['', Validators.required],
            'first_name': ['', Validators.required],
            'dob': ['', Validators.required],
        })

        this.contactForm = this.fb.group({
            'mobile': ['', Validators.required],
            'land_line': '',
            'address': '',
            'email': '',
            'phone': '',
        })

        this.licenseForm = this.fb.group({
            'last_drug_test': ['', Validators.required],
            'physical_exp': '',
            'cdl_exp': '',
            'drv_license': '',
            'hazmat': ''
        })
    }

    submitForm(stepper: MatStepper){
        const submittedForm = Object.assign(
            {}, this.basicInfoForm.value, 
            this.contactForm.value, 
            this.licenseForm.value,
            {enable: true},
            {checked:false})
        this.store.select('drivers').dispatch(new createDriver(submittedForm))    
        this.dialogRef.close()
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

    goToContactForm(stepper){
        stepper.next()
    }

  
  }