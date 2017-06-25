/**
 * Angular 2 core injectable object for creating services.
 */
import { Injectable, Inject } from '@angular/core';

/**
 * Get the picture class model.
 */
import { Picture } from '../models/picture.model';

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
import { FileUploader } from 'ng2-file-upload';

/*
 * Reactive library.
 */
import 'rxjs/add/operator/map';

/**
 * The main gallery service class.
 */
@Injectable()
export class GalleryService {
  /**
   * for encapsulation
   */
  clearUploaderQueue() : void {
    this.uploader.clearQueue();
  }

  read(pictureId: string) : Observable<Picture> {
    return this.http.get('api/pictures/' + pictureId)
      .map(this.extractData);
  }

  create(newPicture: Picture) : Observable<Picture> {
    return this.http.post('api/pictures', newPicture)
      .map(this.extractData);
  }

  update(updatedPicture: Picture) : Observable<Picture> {
    return this.http.put('api/pictures', updatedPicture)
      .map(this.extractData);
  }

  delete(pictureId: string) : Observable<Picture> {
    return this.http.delete('api/pictures/' + pictureId)
      .map(this.extractData);
  }

  register(newPicture: Picture) : Observable<Picture> {
    return this.http.post('api/pictures/register', newPicture)
      .map(this.extractData);
  }

  private extractData(res: Response | any) {
    let body = res.json();
    return body;
  }
}
