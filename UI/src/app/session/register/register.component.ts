import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SessionService } from 'src/app/shared/_services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roleType = [{ id: 1, role: 'administrator' }, { id: 2, role: 'manager' }, { id: 3, role: 'staff' }, { id: 5, role: 'guest' }];
  registeredOrganisation = [{ id: 1, name: 'State Museum, Ranchi' }];
  identityProof = [{ id: 1, name: 'Aadhar Card' }, { id: 2, name: 'PAN Card' }];
  successRegisterMessage = '';
  errorRegisterMessage = '';
  registerForm: FormGroup;

  constructor (private fb: FormBuilder, private sessionService: SessionService, private message: NzMessageService) {
    this.registerForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      designation: '',
      organisation: '',
      role: '',
      contact: '',
      idProof: '',
      idCardNo: ''
    });
  }

  successMessage(): void {
    this.message.success(this.successRegisterMessage, {
      nzDuration: 5000
    });
  }

  errorMessage(): void {
    this.message.error(this.errorRegisterMessage, {
      nzDuration: 5000
    });
  }

  ngOnInit(): void {
  }

  confirmRegistration() {
    let formValue = this.registerForm.value;
    this.sessionService.register(formValue).subscribe((data: any) => {
      console.log(data.success);
      if (data.success == true) {
        console.log(data.success);
        this.successRegisterMessage = data.message;
        this.successMessage();
      } else if (data.success == false) {
        this.errorRegisterMessage = data.message;
        this.errorMessage();
      }
    });
  }

}
