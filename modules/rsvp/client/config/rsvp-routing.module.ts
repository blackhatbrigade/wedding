/* Vendor */
import { NgModule }				            from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

/* Components */
import { RsvpFormComponent } from './components/rsvp-form.component';
import { ListRsvpComponent } from './components/list-rsvp.component';

/* this defines the global rsvp routes */
const RsvpRoutes: Routes = [
  {
    path: 'rsvp',
    component: RsvpFormComponent
  },
  {
    path: 'rsvp/list',
    component: ListRsvpComponent
  },
 
];

@NgModule({
  imports: [
    RouterModule.forChild(RsvpRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RsvpRoutingModule {}
