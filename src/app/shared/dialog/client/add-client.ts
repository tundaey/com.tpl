import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatStepper} from '@angular/material'
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/index';
import { Observable } from 'rxjs/Observable';
import { createClient } from '../../../store/actions/client.action'


@Component({
    selector: 'add-client-dialog',
    templateUrl: 'add-client.html',
  })
  export class AddClientDialog implements OnInit {
      driverForm: FormGroup;
      basicInfoForm: FormGroup;
      contactForm: FormGroup;
      billingForm: FormGroup;
      isLinear: boolean = true;
      client$: Observable<{}>;
      isFetching: boolean;
      error: string;
      isError: boolean = false
  
    constructor(
      public dialogRef: MatDialogRef<AddClientDialog>,private fb: FormBuilder,
      public store: Store<IAppState>,
      @Inject(MAT_DIALOG_DATA) public data: any) 
      {
          this.createForm();
          this.store.select((state)=> state.clients.error).subscribe((error)=>{
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
        this.basicInfoForm = this.fb.group({
            'customer_name': '',
            'address': '',
            'from': '',
            'to': '',
        })

        this.contactForm = this.fb.group({
            'first_name': '',
            'last_name': '',
            'phone': '',
            'email': '',
            'mobile': '',
        })

        this.billingForm = this.fb.group({
            'billing_address': '',
            'invoice_terms': '',
        })
    }

    submitForm(stepper: MatStepper){
        const submittedForm = Object.assign(
            {}, this.basicInfoForm.value, 
            this.contactForm.value,
            {enable: true},
            {checked:false}, 
            this.billingForm.value) 
        
        console.log('client form', submittedForm)
        this.store.select('clients').dispatch(new createClient(submittedForm))
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