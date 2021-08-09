import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  token: any;
  constructor () { }

  getHeader() {
    let headers = new HttpHeaders();
    // this.token = localStorage.getItem('token');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    // headers = headers.set('Authorization', 'bearer' + this.token);
    return headers;
  }

  getHeaderWithMultipart() {
    let headers = new HttpHeaders();
    // this.token = localStorage.getItem('token');
    headers = headers.set('Accept', 'multipart/form-data');
    headers = headers.set('Accept', 'application/json');
    // headers = headers.set('Authorization', 'bearer' + this.token);
    return headers;
  }
}
