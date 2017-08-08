/**
 * Angular 2 core injectable object for creating services.
 */
import { Injectable, Inject } from '@angular/core';

/**
 * Get the registerentry class model.
 */
import { RegisterEntry } from '../models/registerentry.model';

/**
 * Pull in the necessary HTTP objects.
 */
import {
  Http,
  Response,
  HttpModule,
  RequestOptions,
  Request,
  RequestMethod,
  Headers
} from '@angular/http';

import { Observable, Observer }         from 'rxjs/Rx';

/*
 * Reactive library.
 */
import 'rxjs/add/operator/map';

/**
 * The main registry service class.
 */
@Injectable()
export class RegistryService {
  constructor(
    private http: Http
  ) { 

  }

  read(registerentryId: string) : Observable<RegisterEntry> {
    if (registerentryId === '') {
      return this.parseArray(this.http.get('api/registry'));
    } else {
      return this.http.get('api/registry/' + registerentryId)
        .map(this.extractData);
    }
  }

  create(newRegisterEntry: RegisterEntry) : Observable<RegisterEntry> {
    return this.http.post('api/registry', newRegisterEntry)
      .map(this.extractData);
  }

  update(updatedRegisterEntry: RegisterEntry) : Observable<RegisterEntry> {
    return this.http.put('api/registry', updatedRegisterEntry)
      .map(this.extractData);
  }

  delete(registerentryId: string) : Observable<RegisterEntry> {
    return this.http.delete('api/registry/' + registerentryId)
      .map(this.extractData);
  }

  private extractData(res: Response | any) {
    let body = res.json();
    return body;
  }

  private parseArray(registerQuery: any): Observable<RegisterEntry> {
    var registerFeed;

    registerFeed = Observable.create(
      (observer: Observer<RegisterEntry>) => {
        registerQuery
          .subscribe((data: any) => {
            let responseArray = data.json();

            responseArray.forEach((registerItem: RegisterEntry) => {
              if (registerItem) {
                observer.next(registerItem);
              }
            });

            observer.complete();
          });
      });

    return registerFeed;
  }
}
