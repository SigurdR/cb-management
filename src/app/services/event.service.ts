import {Injectable} from "@angular/core";
import {Event} from "../models/event";
import {Http} from "@angular/http";
import {ExtractData, HandleError, ExtractBody} from "./service-helper";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { getLocaleDateTimeFormat } from '@angular/common';


import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { DataSnapshot } from "@firebase/database";

@Injectable()
export class EventService {
 // private eventUrl = "api/event";

	// private eventUrl = "https://srh-authentication.firebaseio.com/events";
	

	private eventUrl = "https://angular6-c3955.firebaseio.com/events";


	constructor(public db: AngularFireDatabase, private http: Http) {}


	get(): Promise<Event[]>{
		return this.http.get(`${this.eventUrl}.json`)
			.toPromise()
			.then(ExtractBody)
			.catch(HandleError);
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