/* Vendor */ import { Component }                      from '@angular/core';
import { BrowserModule }                  from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule }                    from '@angular/forms';

/* Angular2 Models */
import { RegisterEntry } from '../models/registerentry.model';

import { RegistryService } from '../services/registry.service';
import { AuthService }     from '../../../auth/client/services/auth.service';

@Component({
  templateUrl: './../views/registry-list.view.html'
})
export class RegistryListComponent {
  registerList: Array<RegisterEntry>;

  isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private registryService: RegistryService
  ) {
    this.registerList = [];
  }

  ngOnInit() {
    this.registryService.read('')
      .subscribe((data: RegisterEntry) => {
        this.registerList.push(data);
      });
  }
}
