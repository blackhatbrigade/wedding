/* Vendor */
import { Component, Inject }                  from '@angular/core';
import { BrowserModule }                      from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService }               from 'angular2-notifications';
import { FileUploader }                       from 'ng2-file-upload';
import { Router }                             from '@angular/router';

/* Angular2 Models */
import { Picture } from '../models/picture.model';

/* Application Services */
import { GalleryService } from '../services/gallery.service';
import { AuthService }    from '../../../auth/client/services/auth.service';

/* Module Configuration */

@Component({
  templateUrl: './../views/gallery.view.html'
})
export class GalleryComponent {
  constructor (
    private authService:          AuthService,
    private galleryService:       GalleryService,
    private notificationsService: NotificationsService,
    private router:               Router
  ) {
  }

}
