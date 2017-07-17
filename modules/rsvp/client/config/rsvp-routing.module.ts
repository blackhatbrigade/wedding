
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* import the components this module uses */
import { ListArticlesComponent } from '../components/list-articles.component';
import { ArticleDetailComponent } from '../components/article-detail.component';


/* register the global routes for RSVP components */
const rsvpRoutes: Routes = [
  {
    path: 'rsvp/list',
    component: ListRsvpComponent
  },
  {
    path: 'rsvp',
    component: RsvpFormComponent
  }
];

/* connect the routes above to the router module */
@NgModule({
  imports: [
    RouterModule.forChild(rsvpRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RsvpRoutingModule {}
