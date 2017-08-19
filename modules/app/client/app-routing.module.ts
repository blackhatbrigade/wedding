import { NgModule }				 from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { PageNotFoundComponent } from './components/not-found.component';
import { HomeComponent } from './components/home.component';
import { InformationComponent } from './components/information.component';

/* this defines the global app routes */
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'information',
    component: InformationComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
