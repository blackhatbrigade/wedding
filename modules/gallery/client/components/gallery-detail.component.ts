import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GalleryService } from '../services/gallery.service';
import { Gallery } from '../models/gallery.model';

@Component({
  templateUrl: '../views/gallery-detail.view.html'
})
export class GalleryDetailComponent {
  private gallery: Gallery;
  private endpoint: string;

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let galleryId = route.snapshot.params['galleryId'];
    
    this.endpoint = '/api/gallery/upload?galleryId=' + galleryId;

    this.galleryService.read(galleryId).subscribe((data) => {
      this.gallery = data;
    });
  }
  
  uriChange(data: any) {
    this.gallery = data.gallery;
  }
}
