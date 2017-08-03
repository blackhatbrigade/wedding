import { Injectable } from '@angular/core';
import { Rsvp } from '../models/rsvp.client.model';

import {
  Http,
  Response,
  HttpModule,
  RequestOptions,
  Request,
  RequestMethod,
  Headers
} from '@angular/http';

import { Observable } from 'rxjs'; 
import 'rxjs/add/operator/map';

@Injectable()
export class RsvpService {

	constructor(private http: Http){}
	
	getUserRsvp(): Observable<Rsvp>
	{
		return this.http
		.get('api/rsvp/requestrsvp')
		.map((r: Response) => this.extractRsvp(r.json().data));

	}

	getRsvps(): Observable<Rsvp[]>
	{
		return this.http
		.get('api/rsvps')
		.map((r: Response) => r.json().rsvps);
	}

	postRsvp(formData: Rsvp) : Observable<any>
	{
	  return this.http.post('api/rsvp', formData)
    .map(this.extractData);		
  }

	searchRsvps(searchParams: any): Observable<Array<Rsvp>>
	{
		let attending = searchParams['attending'] || true;
		let name = searchParams['name'];
		let note = searchParams['note'];
		return this.http.get('api/rsvps/search?attending='+attending+'&name='+name+'note='+note)
		.map((r: Response)=> r.json().rsvps)
	}
	private extractRsvp(json: any) : Rsvp{
		console.log(json);
		console.log("HERE");
		return new Rsvp(json);	
	}
		  _
	private extractData(res: Response | any) {
		let body = res.json();
		return body;
	}
}