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
  templateUrl: './../views/home.view.html',
  styleUrls: [ './../css/home.styles.css']
})
export class HomeComponent {
  user: any;

  constructor (
    private authService:          AuthService,
    private notificationsService: NotificationsService,
    private router:               Router
  ) {
    this.user = authService.getUser();
  }

}
