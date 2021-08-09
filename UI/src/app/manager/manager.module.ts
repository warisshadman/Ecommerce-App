import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';



@NgModule({
  declarations: [ManagerDashboardComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ManagerModule { }
