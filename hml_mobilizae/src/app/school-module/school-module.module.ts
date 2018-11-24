import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SchoolRoutingModule } from './school-module-routing.module';

import { MaterialModule } from './material';
import { SchoolModuleSidebarComponent } from './school-module-sidebar/school-module-sidebar.component';
import { from } from 'rxjs';
import { SchoolModuleProfileComponent } from './school-module-profile/school-module-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SchoolRoutingModule
  ],
  declarations: [
    SchoolModuleSidebarComponent,
    SchoolModuleProfileComponent
  ]
})
export class SchoolModule {}
