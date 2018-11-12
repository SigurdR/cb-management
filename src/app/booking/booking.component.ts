import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BookingsService } from "../services/bookings.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent implements OnInit {

  ngOnInit() {
  }

  title = 'SRH Großer hall Booking';
  description = 'Book your slot';
  DisplayMessageDate = '';
  DisplayMessageSlot = '';
  allSlots = [];
  date;
  currentDate = '';
  date_code: Date;
  itemValue = '';
  selectedDate = '';
  selectedDateNormal = '';
  slots: Observable<any[]>;
  slots2: Observable<any[]>;
  hallBooking: Observable<any[]>;
  bookings: Array<any>;
  currentUser = '';
  currentUserEmailName = '';

  constructor(public db: AngularFireDatabase, public authserve: AngularFireAuth, private bookingsService: BookingsService) {
    this.date_code = new Date();

    var date = new Date();
    this.currentDate = date.toJSON().substr(0, 10).split("-").join("");
    this.selectedDate = this.currentDate;
    this.selectedDateNormal = date.toJSON().substr(0, 10);

    this.calculateSlotsInfo();
    this.calculateBookingsInfo();

    this.currentUser = this.authserve.auth.currentUser.displayName;
    if (this.authserve.auth.currentUser.email != null) {
      this.currentUserEmailName = this.authserve.auth.currentUser.email.split('@')[0];

    }
    if (this.currentUser == null) {
      this.currentUser = this.currentUserEmailName;
    }
  }

  calculateSlotsInfo() {
    this.slots = this.bookingsService.calculateSlotsValueInfoDB('slots');
    this.slots2 = this.bookingsService.calculateSlotsSnapshotInfoDB('slots');
    var allSlots = [];
    this.slots2.subscribe(data => {
      data.forEach(snapshot => {
        allSlots.push(snapshot.key);
      });
    });
    this.allSlots = allSlots;

  }

  onCancelSlot(inputVal) {
    var canCancel = false;
    var notBooked = false;
    var isExist = false;

    if (!(this.currentDate > this.selectedDate)) {
      this.allSlots.map(slot => {
        if (Number(inputVal) == slot) isExist = true;

      });

      if (isExist) {
        this.bookings.map(obj => {
          if (obj.key == Number(inputVal) && obj.value.includes(':') && obj.value == this.currentUser + ':' + this.currentUserEmailName) {
            canCancel = true;
          }
          else if (obj.key == Number(inputVal) && obj.value == this.currentUser) {
            canCancel = true;
          }
          else if (obj.key == Number(inputVal) && obj.value == 'Available') {
            notBooked = true;
          }
        });

        if (canCancel) {
          this.bookingsService.cancelBookingDB(this.selectedDate, inputVal);
        }
        else if (notBooked) {
          this.DisplayMessageSlot = 'The selected time slot is empty.';
        }
        else {
          this.DisplayMessageSlot = 'The selected time slot is booked by another user.';
        }
      }
      else {
        this.DisplayMessageSlot = 'Please select one of given slots';
      }
    }
  }


  onSubmitSlot() {
    var isExist = false;
    var isNotBooked = false;

    if (!(this.currentDate > this.selectedDate)) {
      this.allSlots.map(slot => {
        if (Number(this.itemValue) == slot) isExist = true;
      });

      this.bookings.map(booking => {
        if (Number(this.itemValue) == booking.key && booking.value == "Available") {
          isNotBooked = true;
        }
      });

      if (isExist && isNotBooked) {
        this.DisplayMessageSlot = '';
        this.bookingsService.bookSlotDB(this.selectedDate, this.itemValue, this.currentUser);
        this.itemValue = '';
      }

      else if (!isExist) {
        this.DisplayMessageSlot = 'Please select one of given slots';
      }

      else if (!isNotBooked) {
        this.DisplayMessageSlot = 'The selected slot is already booked';
      }
    }
  }


  onSubmitDate() {
    this.DisplayMessageSlot = '';
    this.selectedDate = this.selectedDateNormal.replace('-', '');
    this.selectedDate = this.selectedDate.replace('-', '');
    this.selectedDate = this.selectedDate.replace(" ", "");

    if (this.currentDate > this.selectedDate) {
      this.DisplayMessageDate = 'You cannot book/cancel slots for previous days';
    }
    else {
      this.DisplayMessageDate = '';
    }

    this.calculateBookingsInfo();
  }


  calculateBookingsInfo() {

    this.hallBooking = this.bookingsService.getCurrentBookingsDB(this.selectedDate);
    var bookings = [];
    this.hallBooking.subscribe(data => {
      bookings = [];

      if (data) {
        data.forEach(snapshot => {
          var temp = {
            key: "",
            value: ""
          };
          temp.key = snapshot.key;
          temp.value = snapshot.payload.val();
          bookings.push(temp);
        });

        this.allSlots.map(slot => {
          var isExist = false;
          var id = 0;
          bookings.map((obj, index) => {
            if (obj.key == slot) {
              isExist = true;
              id = index;
            }
          });

          if (!isExist) {
            var temp = {
              key: slot,
              value: "Available",
              hidden: true
            }
            bookings.push(temp);
          }
          else if (bookings[id].value == this.currentUser) {
            bookings[id].hidden = false;
          }
          else {
            bookings[id].hidden = true;
          }
        })
        this.bookings = bookings;

      }
    })
  }
}

