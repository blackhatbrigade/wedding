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
	

	getRsvps(): Observable<Rsvp[]>
	{
		return this.http
		.get('api/rsvps')
		.map((r: Response) => r.json().data);
	}

	postRsvp(formData: Rsvp) : Observable<any>
	{
	  return this.http.post('api/articles', formData)
    .map(this.extractData);		
  }

	private extractData(res: Response | any) {
		let body = res.json();
		return body;
	}
}