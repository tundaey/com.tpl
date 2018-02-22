import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'estimate-dialog',
  templateUrl: '../dialog/date.html',
})
export class DateDialog implements OnInit {

  form: FormGroup;
  msgSwitch: string;

  adviertisment = [
    {value: 'Networx', viewValue: 'Networx'},
    {value: 'Flyer', viewValue: 'Flyer'},
    {value: 'Google', viewValue: 'Google'},
    {value: 'Yahoo', viewValue: 'Yahoo'},
    {value: 'Other Search Engine', viewValue: 'Other Search Engine'},
    {value: 'Yelp', viewValue: 'Yelp'},
    {value: 'Angies List', viewValue: 'Angies List'},
    {value: 'BBB', viewValue: 'BBB'},
    {value: 'Direct mail', viewValue: 'Direct mail'},
    {value: 'Yellow Pages', viewValue: 'Yellow Pages'},
    {value: 'Saw Our Trucks', viewValue: 'Saw Our Trucks'},
    {value: 'Yard Sign', viewValue: 'Yard Sign'},
    {value: 'Referral', viewValue: 'Referral'},
    {value: 'TV', viewValue: 'TV'}
  ];

  constructor(
    public dialogRef: MatDialogRef<DateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, private http:Http) {

      this.form = this.fb.group({
        'fname': ['', Validators.compose([Validators.required])],
        'lname': [''],
        'phone': ['', Validators.compose([Validators.required])],
        'phone_alt': [''],
        'email': [''],
        'address': [''],
        'city': [''],
        'how': ['', Validators.compose([Validators.required])],
        'msg': ['']
      });
  }

  ngOnInit() { }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  /**
   * OnSubmit() -> send quote
   */
  onSubmit() {

    var msg  = 'Hi, <br/><br/>' +
      'First Name: ' + this.form.get('fname').value + '<br/>' +
      'Last Name: ' + this.form.get('lname').value + '<br/>' +
      'Phone: ' + this.form.get('phone').value + '<br/>' +
      'Phone: ' + this.form.get('phone_alt').value + '<br/>' +
      'Address: ' + this.form.get('address').value + ', ' + this.form.get('city').value + '<br/>' +
      'Email: ' + this.form.get('email').value + '<br/>' +
      'How: ' + this.form.get('how').value + '<br/>' +
      'Message: ' + this.form.get('msg').value;

    var dataFields = {
      to: "rafal@gowebvision.com",
      subject: "Website: Quote Form",
      msg: msg,
      from: "noreply@secondcityconstruction.com"
    }

    this.sendEmail(dataFields);

    
  }

  sendEmail(body) {

    let headers = new Headers({ 'Content-Type': 'application/json'});

    //let url  = (process.env.NODE_ENV == 'production') ? 'https://com-secondcityconstruction-v3.herokuapp.com/api/public/sendEstimate' : 'http://localhost:8000/api/public/sendEstimate'; // 'http://localhost:8000/api/public/sendEstimate'
    let url  =  'http://localhost:4000/api/sendEstimate'

    return this.http.post(url, JSON.stringify(body), { headers: headers })
    .subscribe((response: Response) => {
      let res = response.json();

      if(res.msg == 'success') {

        let estimate = {

          first_name: this.form.get('fname').value,
          last_name: this.form.get('lname').value,
          phone: this.form.get('phone').value,
          alt_phone: this.form.get('phone_alt').value,
          address: this.form.get('address').value,
          email: this.form.get('email').value,
          how: this.form.get('how').value,
          message: this.form.get('msg').value,
          created: Date.now(),
          id: Math.floor(Math.random()* 90000) + 10000
        }
    
        this.saveEstimate(estimate)
      } else {
        this.msgSwitch = 'error';
      }

    });

  }

  saveEstimate(estimate){
    //this.estimateCollection.add(estimate).then((data)=> this.msgSwitch = 'done')
    
  }
}
