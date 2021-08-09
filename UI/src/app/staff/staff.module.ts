import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';



@NgModule({
  declarations: [StaffDashboardComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class StaffModule { }
