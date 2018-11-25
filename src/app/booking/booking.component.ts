import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BookingsService } from "../services/bookings.service";
import { Slot } from '../models/slot';
import { Event } from '../models/event';
import { SlotAvail } from '../models/slotAvail';
import { ISubscription } from 'rxjs/Subscription';
import { EventService } from '../services/event.service';
import { filter } from 'rxjs/operators';
import { DateFormat } from '../date-format';
import { stringCompare } from '@firebase/database/dist/src/core/util/util';
import { analyzeNgModules } from '@angular/compiler';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent implements OnInit {

  
  // @ViewChild('dateInput') MatInput;

  
  private slotSubscription: ISubscription;
  private hbSubscription: ISubscription;
  private evSubscription: ISubscription;
  private shortSlotSubs: ISubscription;

  evLog: Observable<any[]>;

  

  title = 'SRH Großer hall Booking';
  description = 'Book your slot';
  DisplayMessageDate = '';
  DisplayMessageSlot = '';
  allSlots = [];
  date;
  currentDate = '';
  date_code: Date;
  itemValue = '';
  selectedDate: Date;
  selectedSlot: String;
  selectedDateStr = '';
  selectedDateNormal = '';
  slots: Observable<any[]>;
  slots2: Observable<any[]>;
  hallBooking: Observable<any[]>;
  eventLog: Observable<any[]>;
  bookings: Array<any>;
  currentUser = '';
  currentUserEmailName = '';
  timeSlot: Slot[];
  serverEvent: Event[];
  lastEvNum = 0;
  minDate: Date;
  maxDate: Date;
  dateNotSet: boolean;
  slotToSelect = [];
  // slotAvailArray = [];
  simpleDate: Date;
  dateHKBookTime: Date;
  utcOffsetHK = -480;
  utcOffsetLocal = new Date().getTimezoneOffset();
  
  
  

  constructor(public db: AngularFireDatabase, 
              public authserve: AngularFireAuth, 
              private bookingsService: BookingsService,
              private eventService: EventService) {
    this.date_code = new Date();

    var date = new Date();

    this.currentDate = date.toJSON().substr(0, 10).split("-").join("");
    // this.selectedDate = this.currentDate;
    this.selectedDateNormal = date.toJSON().substr(0, 10);

    this.calculateSlotsInfo();
    this.calculateBookingsInfo();
    this.findLastEv();

    // below shall uncomment after test

    // this.currentUser = this.authserve.auth.currentUser.displayName;
    // if (this.authserve.auth.currentUser.email != null) {
    //   this.currentUserEmailName = this.authserve.auth.currentUser.email.split('@')[0];

    // }

    // above shall uncomment after test

    if (this.currentUser == null) {
      this.currentUser = this.currentUserEmailName;
    }

    // date.getDate return the day of the month
    // date.setDate(day of the month) return the date object with the day of the month

    this.minDate = new Date(date.setDate(date.getDate()+1));
    this.maxDate = new Date(date.setDate(date.getDate()+13));

    this.dateNotSet = true;
    

  }

  ngOnInit() {

    this.slotSubscription = this.bookingsService.getLongSlot().subscribe((timeSlot: Array<Slot>) => {
      this.timeSlot = timeSlot;
    });

    

    // this.evSubscription = this.eventService.getEvents().subscribe((serverEvent: Array<Event>) => {
    //   this.serverEvent = serverEvent;
    // })
  }

  ngOnDestroy(): void {
    this.slotSubscription.unsubscribe();
    this.hbSubscription.unsubscribe();
    this.evSubscription.unsubscribe();
    this.shortSlotSubs.unsubscribe();
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

    if (!(this.currentDate > this.selectedDateStr)) {
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
          this.bookingsService.cancelBookingDB(this.selectedDateStr, inputVal);
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

    // rewrite this function to implement different booking method for admin and user
    // user: use text box in booking page to make book and update to event tree in firebase
    // user: only possible to delete their bookings
    // admin: use scheduler to crud bookings
    // admin: will not use booking page

    var isExist = false;
    var isNotBooked = false;

    if (!(this.currentDate > this.selectedDateStr)) {
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

        let strStartDate = String(this.selectedDateNormal) + "T" +String(this.timeSlot[Number(this.itemValue)-1].start_time);
        let strEndDate = String(this.selectedDateNormal) + "T" + String(this.timeSlot[Number(this.itemValue)-1].end_time);

        var event = [];

        event[0] = this.lastEvNum;
        event[1] = new Date(strStartDate).toLocaleString();
        event[2] = new Date(strEndDate).toLocaleString();
        event[3] = this.currentUser;

        this.bookingsService.bookSlotDB(this.selectedDateStr, this.itemValue, this.currentUser);

        this.eventService.addUserEvent(new Event(event));
          
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
    this.selectedDateStr = this.selectedDateNormal.replace('-', '');
    this.selectedDateStr = this.selectedDateStr.replace('-', '');
    this.selectedDateStr = this.selectedDateStr.replace(" ", "");

    if (this.currentDate > this.selectedDateStr) {
      this.DisplayMessageDate = 'You cannot book/cancel slots for previous days';
    }
    else {
      this.DisplayMessageDate = '';
    }

    this.calculateBookingsInfo();
  }

  findLastEv() {

    this.eventLog = this.eventService.getCurrentEvents();
    this.evSubscription = this.eventLog.subscribe(data => {
      
      if (data && data.length > 0) {
        this.slotToSelect = this.getAvailSlot(data);
        return Math.max.apply(Math, data.map((item) => {
          this.lastEvNum = Number(item.id)+1
        }))
      }
      else this.lastEvNum = Number(1)
    });
  }

  getAvailSlot(data: any) : String[]{

    let slotAvailArray = [];
    let elementToRemove = 0;

    this.shortSlotSubs = this.bookingsService.getSlot().subscribe(c => {
      c.forEach(snapshot => {
        slotAvailArray.push(snapshot.payload.val());
      });


      if (this.selectedDateStr != null) {
        let items = [];
        data.forEach(snapshot => {
          items.push(snapshot.start_date);
        });
  
        for (var j=0; j<items.length; j++) {
          let recordDate = new Date(items[j]);
          for (var i=0; i<slotAvailArray.length;i++) {
            let inputDate = new Date(this.selectedDateStr+"T"+this.convert12to24UTC(slotAvailArray[i],true)+"Z");
            let inputDateStart = new Date(new Date(new Date(this.selectedDateStr+"T"+"00:00:00").toJSON()).toUTCString());
            let inputDateEnd = new Date(this.selectedDateStr+"T"+"23:00:00");
  
            if (recordDate >= inputDateStart && recordDate <= inputDateEnd ) {
              if (recordDate.getTime() == inputDate.getTime()) {
                  slotAvailArray.splice(i,1);
              }
            }
          }
        }
      }
      this.slotToSelect = slotAvailArray;
    });
    return this.slotToSelect;
  }


  calculateBookingsInfo() {

    this.hallBooking = this.bookingsService.getCurrentBookingsDB(this.selectedDate);
    var bookings = [];
    this.hbSubscription = this.hallBooking.subscribe(data => {
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

        //bookings: {key:(slotNum); value(username)}
        // allSlots: {slotNum}

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

  serializeEvent(data: any, insert: boolean = false): Event {
    const result = {};

      for(let i in data){
          if(i.charAt(0) == "$" || i.charAt(0) == "_") continue;
          if(insert && i == "id") continue;
          result[i] = data[i];
      }
      return result as Event;
  }

  enableTimeSelect() {
    
    // this.convertToHKUTC;
    this.selectedDateStr = new Date(new Date(new Date(this.selectedDate.getTime()+480*60000).toJSON()).toUTCString()).toJSON().substr(0,10);
    // this.selectedDateStr = new Date(new Date(new Date(this.dateHKBookTime.getTime() + 480*60000).toJSON()).toUTCString()).toJSON().substr(0,10);
    this.dateNotSet = false;
    this.findLastEv();
  }

  convertToHKUTC() {

    var diff = this.utcOffsetLocal-this.utcOffsetHK;
    this.dateHKBookTime = new Date(this.selectedDate.getTime() + diff*60000);
  }

  convert12to24UTC(time: string, halfToFull: boolean): string {

    // only works for time slot from 10:00AM to 08:00PM HK Time
    if (halfToFull) {

      if (time.split(" ")[1] == "AM") {
        var timeVal = Number(time.split(":")[0])-8; // HK time = UTC + 8
        var timeStr = String(timeVal)+":"+time.split(" ")[0].split(":")[1]+":00";

        return (timeStr.length<8)? "0"+timeStr : timeStr;
      }
      else {
        if (time.split(":")[0] != "12") {
          timeVal = Number(time.split(":")[0])+12-8;
          timeStr = String(timeVal)+":"+time.split(" ")[0].split(":")[1]+":00";

          return (timeStr.length<8)? "0"+timeStr : timeStr;
        }
        else {
          var timeVal = Number(time.split(":")[0])-8; // HK time = UTC + 8
          var timeStr = String(timeVal)+":"+time.split(" ")[0].split(":")[1]+":00";

          return (timeStr.length<8)? "0"+timeStr : timeStr;
        } 
      }
    }
  }
}

