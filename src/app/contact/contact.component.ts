import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  form: FormGroup;
  ngOnInit() {
  }
  constructor(private fb: FormBuilder, private af: AngularFireDatabase) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  onSubmit() {
    const {name, email, message} = this.form.value;
    const date = Date();
    var datum = Date.parse(date);
    datum = datum/1000;
    var dateStamp = datum.toString();
    var formRequestFields = [ 'name', 'email', 'message', 'date' ];

    let formRequest = { name, email, message, date };
    this.af.list('/messages/').set(dateStamp,formRequest);
    this.form.reset();
    alert("Your message has been submitted ");
  }
}
