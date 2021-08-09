import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './administrator/dashboard/dashboard.component';
import { AdmininstratorComponent } from './dashboards/admininstrator/admininstrator.component';
import { ManagerComponent } from './dashboards/manager/manager.component';
import { StaffComponent } from './dashboards/staff/staff.component';
import { VisitorComponent } from './dashboards/visitor/visitor.component';
import { ResourceComponent } from './library/resource/resource.component';
import { ManagerDashboardComponent } from './manager/manager-dashboard/manager-dashboard.component';
import { LoginComponent } from './session/login/login.component';
import { RegisterComponent } from './session/register/register.component';
import { AuthChildGuard } from './shared/_guard/auth-child.guard';
import { StaffDashboardComponent } from './staff/staff-dashboard/staff-dashboard.component';
import { VisitorDashboardComponent } from './visitor/visitor-dashboard/visitor-dashboard.component';

const routes: Routes = [
  {
    path: 'administrator',
    canActivateChild: [AuthChildGuard],
    component: AdmininstratorComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'resource', component: ResourceComponent },
    ]
  },
  {
    path: 'manager',
    canActivateChild: [AuthChildGuard],
    component: ManagerComponent,
    children: [
      { path: 'dashboard', component: ManagerDashboardComponent },
    ]
  },
  {
    path: 'staff',
    canActivateChild: [AuthChildGuard],
    component: StaffComponent,
    children: [
      { path: 'dashboard', component: StaffDashboardComponent },
    ]
  },
  {
    path: 'visitor',
    canActivateChild: [AuthChildGuard],
    component: VisitorComponent,
    children: [
      { path: 'dashboard', component: VisitorDashboardComponent },
    ]
  },
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
