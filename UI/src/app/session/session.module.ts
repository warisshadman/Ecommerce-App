import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { SessionService } from '../shared/_services/session.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SessionRoutingModule } from './session-routing.module';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    SharedModule
  ],
  providers: [SessionService]
})
export class SessionModule { }
