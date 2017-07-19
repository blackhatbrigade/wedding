import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RsvpService } from '../services/Rsvp.service';

import { Rsvp } from '../models/rsvp.client.model';

@Component({
  templateUrl: '../views/rsvp-form.html',
  styleUrls: ['../styles/rsvp.css']
})
export class RsvpFormComponent implements OnInit{
  Rsvp: Rsvp;

  constructor(
    private RsvpService: RsvpService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Rsvp = new Rsvp();
  }

  ngOnInit(){
    
  }

  //post the RSVP to the database
  submit() : void {
    //TODO : validate
    this.RsvpService.postRsvp(this.Rsvp).subscribe(data =>{

    });
  }



}


