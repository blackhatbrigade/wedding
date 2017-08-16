/* Vendor */
import { Component }                      from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule }                    from '@angular/forms';

/* Angular2 Models */
import { RegisterEntry } from '../models/registerentry.model';

import { RegistryService } from '../services/registry.service';
import { AuthService }     from '../../../auth/client/services/auth.service';

@Component({
  templateUrl: './../views/registry-create.view.html'
})
export class RegistryFormComponent {
  registry: RegisterEntry;
  isNew: boolean = true;

  constructor (
    private router:          Router,
    private route:           ActivatedRoute,
    private registryService: RegistryService
  ) {
    this.registry = new RegisterEntry();
  }

  /**
   * Init functionality.
   */
  ngOnInit(): void {
    this.route.params
      .subscribe((data) => {
        if (data['id']) {
          // Read the registry entry being edited.
          this.isNew = false;
          this.registryService.read(data['id'])
            .subscribe((entry: RegisterEntry) => {
              this.registry = entry;
            });
        }
      });
  }

  /**
   * Handles form submission.
   */
  submit(): void {
    if (this.isNew) {
      this.registryService.create(this.registry)
        .subscribe((result) => {
        });
    } else {
      this.registryService.update(this.registry)
        .subscribe((result) => {
        });
    }
  }
}
