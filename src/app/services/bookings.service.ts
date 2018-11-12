import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class BookingsService {
  //hallBooking: Observable<any[]>;

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
}