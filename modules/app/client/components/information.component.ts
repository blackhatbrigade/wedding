/* Vendor */
import { Component, Inject }                  from '@angular/core';
import { BrowserModule }                      from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService }               from 'angular2-notifications';
import { FileUploader }                       from 'ng2-file-upload';
import { Router }                             from '@angular/router';

/* Application Services */
import { AuthService }    from '../../../auth/client/services/auth.service';

/* Module Configuration */

@Component({
  templateUrl: './../views/information.view.html',
  styleUrls: [ '../css/home.styles.css']
})
export class InformationComponent {
  user: any;
  images: any = {
    venue: 'https://s3-us-west-2.amazonaws.com/bennett-personal/stormmtn2.jpg'
  };

  constructor (
    private authService:          AuthService,
    private notificationsService: NotificationsService,
    private router:               Router
  ) {
    this.user = authService.getUser();
  }

}
