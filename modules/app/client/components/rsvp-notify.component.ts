import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/client/services/auth.service';
import { RsvpService } from '../../../rsvp/client/services/rsvp.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './../views/rsvp-notify.html',
  selector: 'rsvp-notify',
  styles: [
    require('./../less/rsvp-notify.style.less').toString()
  ],
})
export class RsvpNotifyComponent implements OnInit{
  needsRsvp: boolean = false;
  verified: boolean = false;

  constructor(
    private AuthService :AuthService,
    private RsvpService: RsvpService
  ){
    
  }

  ngOnInit(){
    if(this.AuthService.loggedIn){
      this.checkRsvp();
    }
    
    //notify if necessary
    this.AuthService.authChanged$.subscribe(
    loggedIn => {
      if(loggedIn){
        this.verified = this.AuthService.getUser().verified;
        this.checkRsvp();
      }
      else{
        this.needsRsvp = false;
      }
    });
  }

  checkRsvp(){
    this.verified = this.AuthService.getUser().verified;
    this.RsvpService.getUserRsvp()
    .subscribe(rsvp => {
      this.needsRsvp = !rsvp.name;
    });
  }



}
