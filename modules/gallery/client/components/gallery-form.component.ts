import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GalleryService } from '../services/gallery.service';

import { Gallery } from '../models/gallery.model';

@Component({
  templateUrl: '../views/gallery-form.view.html'
})
export class GalleryFormComponent {
  gallery: Gallery;
  edit: boolean;

  constructor(
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.gallery = new Gallery();
    this.edit = false;

    if (this.route.snapshot.params['galleryId']) {
      this.edit = true;

      let galleryId = this.route.snapshot.params['galleryId'];

      this.galleryService.read(galleryId).subscribe((data) => {
        this.gallery = data;
      });
    }
  }

  submit() : void {
    if (this.edit) {
      // TODO actually verify this works (server controller seems to be broken)
      this.galleryService.update(this.gallery).subscribe((data) => {
        this.router.navigate([ '../' ], { relativeTo: this.route });
      });
    } else {
      this.galleryService.create(this.gallery).subscribe((data) => {
        this.router.navigate([ '../' ], { relativeTo: this.route });
      });
    }
  }
}
