import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { AdmininstratorComponent } from './admininstrator/admininstrator.component';
import { ManagerComponent } from './manager/manager.component';
import { StaffComponent } from './staff/staff.component';
import { VisitorComponent } from './visitor/visitor.component';



@NgModule({
  declarations: [AdmininstratorComponent, ManagerComponent, StaffComponent, VisitorComponent],
  imports: [
    CommonModule,
    SharedModule,

  ]
})
export class DashboardsModule { }
