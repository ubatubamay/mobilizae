import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchoolModuleSidebarComponent } from './school-module-sidebar/school-module-sidebar.component';
import { SchoolModuleProfileComponent } from './school-module-profile/school-module-profile.component';

import { CanDeactivateGuard } from '../can-deactivate.guard';

const schoolModuleRoutes: Routes = [
  {
    path: '',
    component: SchoolModuleSidebarComponent,
    children: [
      {
        path: '',
        component: SchoolModuleProfileComponent,
      }]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(schoolModuleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SchoolRoutingModule { }

