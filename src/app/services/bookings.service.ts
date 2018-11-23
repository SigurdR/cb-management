import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';


import 'rxjs/add/operator/map';
import { Slot } from '../models/slot';
import { SlotAvail } from '../models/slotAvail';

@Injectable()
export class BookingsService {
 
  slots: Slot[];
  
  constructor(public db: AngularFireDatabase) { }

  getCurrentBookingsDB(selectedDate): Observable<any[]> {
    return this.db.list('hallBooking/' + selectedDate).snapshotChanges();
  }

  bookSlotDB(selectedDate, itemValue, currentUser): void {
    this.db.list('/hallBooking/' + selectedDate + "/").set(itemValue, currentUser);
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

  getLongSlot(): Observable<Slot[]> {
    return this.db.list('/longSlot/').snapshotChanges().map((changes) => {
      return changes.map( c => {
        return new Slot({key: c.payload.key, ...c.payload.val()});
      });
    })     
  }

  // getSlot(): Observable<any[]> {
  //   return this.db.list('/slots/').snapshotChanges().map((changes) => {
  //     return changes.map( c => {
  //       return new SlotAvail({key: c.payload.key, ...c.payload.val()});
  //     });
  //   })
  // }

  getSlot(): Observable<any[]> {
    return this.db.list('/slots/').snapshotChanges()
  }


  

  


}