/* Vendor */
import { NgModule }                       from '@angular/core';
import { NgbModule }                      from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }                    from '@angular/forms';
import { BrowserModule }                  from '@angular/platform-browser';
import { RouterModule, Routes }           from '@angular/router';

/* Services */
import { RegistryService }       from './services/registry.service';

/* Components */
import { RegistryComponent }     from './components/registry.component';
import { RegistryListComponent }     from './components/registry-list.component';
import { RegistryFormComponent }     from './components/registry-form.component';

/* Routing Module */
import { RegistryRoutingModule } from './config/registry-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RegistryRoutingModule
  ],
  declarations: [
    RegistryComponent,
    RegistryListComponent,
    RegistryFormComponent
  ],
  /* You may want to inject this token higher up in the DI tree. For more
   * info:
   * https://angular.io/docs/ts/latest/guide/dependency-injection.html
   */
  providers: [
    RegistryService
  ],
  bootstrap: [
    RegistryComponent
  ]
})
export class RegistryModule {}
