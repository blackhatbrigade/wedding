import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/client/services/auth.service';
import { RsvpService } from '../../../rsvp/client/services/rsvp.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './../views/rsvp-notify.html',
  selector: 'rsvp-notify'
})
export class RsvpNotifyComponent implements OnInit{
  needsRsvp: boolean = false;


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
        this.checkRsvp();
      }
      else{
        this.needsRsvp = false;
      }
    });
  }

  checkRsvp(){
    this.RsvpService.getUserRsvp()
    .subscribe(rsvp => {
      this.needsRsvp = !rsvp.name;
    });
  }



}
