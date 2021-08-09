import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { VisitorDashboardComponent } from './visitor-dashboard/visitor-dashboard.component';



@NgModule({
  declarations: [VisitorDashboardComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class VisitorModule { }
