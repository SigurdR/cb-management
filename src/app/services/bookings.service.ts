import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { SlicePipe } from '@angular/common';
// import { start } from 'repl';
// import { async } from '@angular/core/testing';

@Injectable()
export class BookingsService {
  //hallBooking: Observable<any[]>;

  timeSlot$: Observable<any[]>;
  eventSlot$: Observable<any[]>;
  events: any;
  

  private slotUrl = "https://angular6-c3955.firebaseio.com/longSlot";

  constructor(public db: AngularFireDatabase, private http: Http) { }

  getCurrentBookingsDB(selectedDate): Observable<any[]> {
    return this.db.list('hallBooking/' + selectedDate).snapshotChanges();
  }

  bookSlotDB(selectedDate, itemValue, currentUser): void {
    this.db.list('/hallBooking/' + selectedDate + "/").set(itemValue, currentUser);
    
    // this.timeSlot$ = this.http.get(`${this.slotUrl}.json`)
    //                   .map(res => res.json());

    // this.eventSlot$ = this.db.list('/longSlot/', ref => {
    //   return ref.orderByChild('slot').equalTo(itemValue)
    // }).snapshotChanges();

    // this.eventSlot$.map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    // }).subscribe(events => {
    //   this.events = events;
    // });

    var i = itemValue;

    this.db.list('/longSlot/').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
    }).subscribe(events => {
      this.events = events;
    });

  

    this.insertEvent(selectedDate, this.events[i].start_time, this.events[i].end_time, currentUser);
    
    
    


  }

  cancelBookingDB(selectedDate, inputVal): void {
    this.db.list('/hallBooking/' + selectedDate + "/").remove(inputVal);
  }

  calculateSlotsValueInfoDB(slots): Observable<any[]> {
    return this.db.list('slots').valueChanges();
  }

  calculateSlotsSnapshotInfoDB(slots): Observable<any[]> {
    return this.db.list('slots').snapshotChanges();
  }

  insertEvent(selectedDate, start_date, end_date, currentUser): void {
    this.db.list('/events/' + selectedDate + "/").set('start_time', start_date);
    this.db.list('/events/' + selectedDate + "/").set('end_time', end_date);
    this.db.list('/events/' + selectedDate + "/").set('text', currentUser);
  }


}