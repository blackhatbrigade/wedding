import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RsvpService } from '../services/rsvp.service';

import { Rsvp } from '../models/rsvp.client.model';
import {NotificationsService} from 'angular2-notifications';

import { AuthService } from '../../../auth/client/services/auth.service';

@Component({
  templateUrl: '../views/rsvp-form.html',
  styleUrls: ['../styles/rsvp.css']
})
export class RsvpFormComponent implements OnInit{
  Rsvp: Rsvp;
  currentPartyMember: string = null;


  constructor(
    private RsvpService: RsvpService,
    private NotificationsService: NotificationsService,
    private AuthService :AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Rsvp = new Rsvp();
  }

  ngOnInit(){
    this.RsvpService.getUserRsvp().
    subscribe(rsvp => {
      console.log(rsvp);
      this.Rsvp = rsvp;
      this.Rsvp.removeDuplicates();
    });
  }


  partyMemberKeydown(){
    this.addPartyMember();
  }

  setAttending(val: boolean)
  {
    this.Rsvp.attending = val;
  }
  addPartyMember(){
    if(this.currentPartyMember.length < 2)
      {
        return;
      }
    let index = this.Rsvp.partyMembers.indexOf(this.currentPartyMember);
    if(index < 0 )
      {
        this.Rsvp.partyMembers.push(this.currentPartyMember);
        this.currentPartyMember = '';
      }
  }
  removePartyMember(selectedMember){
    let index = this.Rsvp.partyMembers.indexOf(selectedMember)
    if(index > -1)
    {
        this.Rsvp.partyMembers.splice(index, 1);
    }
  }
  //post the RSVP to the database
  submit() : void {
    let state = this.Rsvp.validate();
    if(state.valid)
    {
      //TODO : validate
      this.RsvpService.postRsvp(this.Rsvp).subscribe(data =>{
        console.log(data);
        this.NotificationsService.success("Thank you for submitting your rsvp!");
        setTimeout(()=> {
          //this.router.navigate(['/']);
        }, 3000)
      }, error => {
        this.NotificationsService.error("Something went wrong. Please reload and try again.")
      });
    }
    else
    {
      this.NotificationsService.error(state.message);
    }

  }



}


