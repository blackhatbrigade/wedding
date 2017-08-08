/* Vendor */
import { NgModule }				            from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

/* Components */
import { RegistryComponent } from '../components/registry.component';
import { RegistryFormComponent } from '../components/registry-form.component';
import { RegistryListComponent } from '../components/registry-list.component';

/* this defines the global registry routes */
const RegistryRoutes: Routes = [
  {
    path: 'registry',
    component: RegistryListComponent
  },
  {
    path: 'registry/create',
    component: RegistryFormComponent
  },
  {
    path: 'registry/edit/:id',
    component: RegistryFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(RegistryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegistryRoutingModule {}
