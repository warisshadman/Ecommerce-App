import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../shared/_services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  companyName = 'Scion Museum';
  loginForm: FormGroup;

  constructor (private fb: FormBuilder, private sessionService: SessionService, private router: Router) {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }


  ngOnInit(): void {
  }

  login() {
    let formValue = this.loginForm.value;
    this.sessionService.login(formValue).subscribe(async (data: any) => {
      console.log(data);
      if (data.success == true) {
        console.log(data);
        localStorage.removeItem('token');
        let expire = new Date();
        let time = Date.now() + ((3600 * 1000) * 6);
        expire.setTime(time);
        await localStorage.setItem('token', data.data.token);
        console.log(data);
        if (data.data.userType == 'administrator') {
          this.router.navigate(['/administrator/dashboard']);
        } else if (data.data.userType == 'manager') {
          this.router.navigate(['/manager/dashboard']);
        } else if (data.data.userType == 'staff') {
          this.router.navigate(['/staff/dashboard']);
        } else if (data.data.userType == 'visitor') {
          this.router.navigate(['/visitor/dashboard']);
        }
      }
    });
  }

}
