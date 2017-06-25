/**
 * Angular 2 core injectable object for creating services.
 */
import { Injectable, Inject } from '@angular/core';

/**
 * Get the picture class model.
 */
import { Gallery } from '../models/gallery.model';

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

import { Observable }   from 'rxjs/Rx';

/*
 * Reactive library.
 */
import 'rxjs/add/operator/map';

/**
 * The main gallery service class.
 */
@Injectable()
export class GalleryService {

  constructor(
    private http: Http
  ) {

  }

  read(pictureId: string) : Observable<Gallery> {
    return this.http.get('api/gallery/' + pictureId)
      .map(this.extractData);
  }

  create(newGallery: Gallery) : Observable<Gallery> {
    return this.http.post('api/gallery', newGallery)
      .map(this.extractData);
  }

  update(updatedGallery: Gallery) : Observable<Gallery> {
    return this.http.put('api/gallery', updatedGallery)
      .map(this.extractData);
  }

  delete(pictureId: string) : Observable<Gallery> {
    return this.http.delete('api/gallery/' + pictureId)
      .map(this.extractData);
  }

  register(newGallery: Gallery) : Observable<Gallery> {
    return this.http.post('api/gallery/register', newGallery)
      .map(this.extractData);
  }

  list() : Observable<any> {
    return this.http.get('api/gallery').map(this.extractData);
  }

  private extractData(res: Response | any) {
    let body = res.json();
    return body;
  }
}
