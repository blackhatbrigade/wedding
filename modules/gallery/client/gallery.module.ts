/* Vendor */
import { NgModule }                           from '@angular/core';
import { BrowserModule }                      from '@angular/platform-browser';
import { RouterModule, Routes }               from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NotificationsService }               from 'angular2-notifications';
import { SharedModule } from '../../shared/client/shared.module';
/* Services */
import { GalleryService }       from './services/gallery.service';

/* Components */
import { GalleryComponent }     from './components/gallery.component';

/* Routing Module */
import { GalleryRoutingModule } from './config/gallery-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    GalleryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    GalleryComponent
  ],
  /* You may want to inject this token higher up in the DI tree. For more
   * info:
   * https://angular.io/docs/ts/latest/guide/dependency-injection.html
   */
  providers: [
    GalleryService
  ],
  bootstrap: [
    GalleryComponent
  ]
})
export class GalleryModule {}
