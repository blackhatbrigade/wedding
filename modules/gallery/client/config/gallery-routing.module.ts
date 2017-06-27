/* Vendor */
import { NgModule }				            from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

/* Components */
import { GalleryComponent } from '../components/gallery.component';
import { GalleryFormComponent } from '../components/gallery-form.component';
import { GalleryDetailComponent } from '../components/gallery-detail.component';

/* this defines the global gallery routes */
const GalleryRoutes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'gallery/create',
    component: GalleryFormComponent
  },
  {
    path: 'gallery/edit/:galleryId',
    component: GalleryFormComponent
  },
  {
    path: 'gallery/view/:galleryId',
    component: GalleryDetailComponent
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
