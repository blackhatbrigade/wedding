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

import { PictureConfig, PICTURE_DI_CONFIG } from '../config/config';

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
   * The uploader object.
   */
  uploader: FileUploader;

  /**
   * Private variable that holds an array of the allowed types.
   */
  private allowedTypes: Array<string>;

  /**
   * The max size a image can be to upload.
   */
  private maxSize: number;

  constructor(
    private http: Http,
    @Inject(PICTURE_DI_CONFIG) config : PictureConfig
  ) { 
    this.uploader = new FileUploader({ url: config.uploads.picture.url });
    this.allowedTypes = config.uploads.picture.allowedTypes;
    this.maxSize = config.uploads.picture.maxSize;
  }

  /**
   * called to upload the last item in the uploader queue
   *  @param {(item: any, response: any, headers: any) => void} onCompleteItem
   *    a callback function (kind of) which is called after the upload
   *    process is done
   *  //TODO either switch uploader or add cb's for error/success
   */
  uploadPicture(onCompleteItem : (item: any, response: any, status: number, headers: any) => void) {
    // Only if file(s) are queued
    if (this.uploader.queue.length > 0) {
      this.uploader.onCompleteItem = onCompleteItem;

      // we only want to upload the last file the user selected
      let fileItem = this.uploader.queue[this.uploader.queue.length-1];

      // I wish this library registered callbacks here as part of the call
      fileItem.upload();
    } else {
      // No files to upload
    }
  }

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
