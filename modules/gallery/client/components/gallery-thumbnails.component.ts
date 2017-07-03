import { Component } from '@angular/core';

import { GalleryService } from '../services/gallery.service';
import { Gallery } from '../models/gallery.model';

@Component({
  selector: 'gallery-thumbnails',
  templateUrl: '../views/gallery-thumbnails.view.html',
  styleUrls: [ '../styles/gallery-thumbnails.style.css' ]
})
export class GalleryThumbnailsComponent {
  private galleries: Array<Gallery>;

  constructor(
    private galleryService: GalleryService
  ) {
    this.galleryService.list().subscribe((data) => {
      this.galleries = data;
    });
  }
}
