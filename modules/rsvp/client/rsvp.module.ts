import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { NgbModule }      from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes }     from '@angular/router';
import { AppModule }      from '../../app/client/app.module';
import { RsvpRoutingModule }      from './config/rsvp-routing.module';
import { FormsModule } from '@angular/forms';

import { RsvpFormComponent } from './components/rsvp-form.component';
import { ListRsvpComponent } from './components/list-rsvp.component';

@NgModule({
  imports:      [
    BrowserModule,
    NgbModule,
    HttpModule,
    RsvpRoutingModule,
    FormsModule

  ],
  /*components available inside of this module */
  declarations: [
    RsvpFormComponent,
    ListRsvpComponent
  ],
  /*components available to other modules */
  exports: [],

  /* which components to load when starting this module */
  bootstrap:    [ RsvpFormComponent]
})

export class RsvpModule {}
