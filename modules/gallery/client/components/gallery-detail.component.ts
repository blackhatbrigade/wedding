import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GalleryService } from '../services/gallery.service';
import { Gallery } from '../models/gallery.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../auth/client/services/auth.service';

@Component({
  templateUrl: '../views/gallery-detail.view.html'
})
export class GalleryDetailComponent {
  private gallery: Gallery;
  private endpoint: string;
  private user: any;

  constructor(
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    let galleryId = route.snapshot.params['galleryId'];
    
    this.endpoint = '/api/gallery/upload?galleryId=' + galleryId;

    this.galleryService.read(galleryId).subscribe((data) => {
      this.gallery = data;
    });

    this.user = this.authService.getUser();
  }
  
  uriChange(data: any) {
    this.gallery = data.gallery;
  }

  isAllowedToEdit() {
    if (this.gallery) {
      return this.gallery.publicWrite || this.user._id === this.gallery.creator || this.gallery.allowedUsers.includes(this.user._id);
    }

    return false;
  }
}
