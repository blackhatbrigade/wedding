import { Component, OnInit } from '@angular/core';
import { Rsvp }      from '../models/rsvp.client.model';
import { RsvpService } from '../services/rsvp.service';
import { DatePipe } from '@angular/common';
@Component({
	selector:'list-rsvp',
	providers: [RsvpService],
	templateUrl: '../views/list-rsvps.html'
})

export class ListRsvpsComponent implements OnInit{

	rsvps: Rsvp[];
	selectedRsvp: Rsvp;
	attendingSum: number = 0;
	/*
	* The constructor is for simple initializations like wiring constructor paramaters to properties
	* We should be able to create a component in a test and not worry that it might do real work, 
	* like calling a server!
	*/
	constructor(private rsvpService: RsvpService){}

	/* 
	* Leave it to angular to call the initialization code at the right time
	*/
	ngOnInit() : void{
		this.getRsvps();
	}

	/* 
	* Our service returns a promise, once resolved we will bind the data 
	*/
	getRsvps() : void{
		this.rsvpService.getRsvps()

			.subscribe((data) => { this.rsvps = data;

				for(let rsvp of this.rsvps)
				{
					this.attendingSum += rsvp.partySize;
				}
			});
	}
	
	onSelect(rsvp: Rsvp): void{
		this.selectedRsvp = rsvp;
	}

}	

