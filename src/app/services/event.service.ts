import {Injectable} from "@angular/core";
import {Event} from "../models/event";
import {Http} from "@angular/http";
import {ExtractData, HandleError, ExtractBody} from "./service-helper";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { LoggerService } from './logger.service';
import { getLocaleDateTimeFormat } from '@angular/common';


import 'rxjs/add/operator/toPromise';
import { Observable, of } from "rxjs";
import { DataSnapshot } from "@firebase/database";

@Injectable()
export class EventService {
 // private eventUrl = "api/event";

	// private eventUrl = "https://srh-authentication.firebaseio.com/events";
	

	private eventUrl = "https://angular6-c3955.firebaseio.com/events";
	private dbPath = '/events';

	eventRef: AngularFireList<Event> = null;

	events: Event[];


	constructor(public db: AngularFireDatabase, private http: Http) {
		this.eventRef = db.list(this.dbPath);
	}

	private static handleError<T>(operation = 'operation', result ?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			LoggerService.log(`${operation} failed: ${error.message}`);
	  
			if (error.status >= 500) {
			  throw error;
			}
	  
			return of(result as T);
		};
	}


	get(): Promise<Event[]>{
		return this.http.get(`${this.eventUrl}.json`)
			.toPromise()
			.then(ExtractBody)
			.catch(HandleError);
	}

	getEvents(): Observable<Event[]> {
		return this.db.list('/events/').snapshotChanges().map((changes) => {
			return changes.map( c => {
			  return new Event({key: c.payload.key, ...c.payload.val()});
			});
		})     
	}

	addEvent(events: Event): void {
		this.eventRef.push(events);
	}



	insert(event: Event): Promise<Event> {
		return this.http.put(`${this.eventUrl}/${event.id}.json`, JSON.stringify(event))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}

	update(event: Event): Promise<void> {
		return this.http.put(`${this.eventUrl}/${event.id}.json`, JSON.stringify(event))
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
  }

	remove(id: number): Promise<void> {
		return this.http.delete(`${this.eventUrl}/${id}.json`)
			.toPromise()
			.then(ExtractData)
			.catch(HandleError);
	}
}