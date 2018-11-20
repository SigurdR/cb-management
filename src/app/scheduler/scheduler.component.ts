/// <reference types="@types/dhtmlxscheduler"/>
import { Component, OnInit } from '@angular/core';
import {ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
// import {} from "@types/dhtmlxscheduler";
import {EventService} from "../services/event.service";
import {Event} from "../models/Event";
import { ISubscription } from 'rxjs/Subscription';
import { and } from '@angular/router/src/utils/collection';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from '@firebase/util';
import { Observable } from 'rxjs/Observable';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "scheduler",
  styleUrls: ['./scheduler.component.css'],
  templateUrl: './scheduler.component.html',
  providers: [EventService]
})

export class SchedulerComponent implements OnInit {

    evObs: Observable<any[]>;
    
    private evSubs: ISubscription;
    allEvents: Event[];


  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  constructor(private eventService: EventService){}

  ngOnInit(){
        scheduler.config.xml_date = "%m-%d-%Y, %g:%i:%s %A";
        scheduler.config.hour_date = "%h:%i %A";
        scheduler.clearAll();
        scheduler.config.readonly = true;
        scheduler.config.first_hour = 10;
        scheduler.config.last_hour = 22;
        
        scheduler.init("scheduler_here");

        // scheduler.attachEvent("onEventAdded",(id, ev) => {
        //     this.eventService.insert(this.serializeEvent(ev, true))
        //         .then((response)=> {
        //         // if(response.id != id){
        //         //         scheduler.changeEventId(id, response.id);
        //         //     }
        //         // this.eventService.get()
        //         //     .then((data) => {
        //         //         scheduler.parse(this.extractBody(data), "json");
        //         // });
        //         })
        // });

        scheduler.attachEvent("onEventChanged", (id, ev) => {
            this.eventService.update(this.serializeEvent(ev));
        });

        scheduler.attachEvent("onEventDeleted", (id) => {
            this.eventService.remove(id);
        });

        this.evObs = this.eventService.getCurrentEvents();
        this.evSubs = this.evObs.subscribe((data) => {
            if (data) {
                scheduler.parse(this.extractBody(data),"json");
            }
        });
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.evSubs.unsubscribe();
    }

    private serializeEvent(data: any, insert: boolean = false): Event {
    const result = {};

        for(let i in data){
            if(i.charAt(0) == "$" || i.charAt(0) == "_") continue;
            if(insert && i == "id") continue;
            if(data[i] instanceof Date){
                result[i] = scheduler.templates.xml_format(data[i]);
            } else {
                result[i] = data[i];
            }
        }
        return result as Event;
    }

    private extractBody(data: any): Event[] {
        var result = [];
        var event: Event;

        for(let i in data){
            event = data[i];
            result.push(event);
        }

        return result;

    } 
}
