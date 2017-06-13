/* Vendor */
import { NgModule }				            from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

/* Components */
import { GalleryComponent } from '../components/gallery.component';

/* this defines the global gallery routes */
const GalleryRoutes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(GalleryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GalleryRoutingModule {}
