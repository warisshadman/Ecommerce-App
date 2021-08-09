import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthInterceptorService } from './auth-interceptor.service';



@Injectable({
  providedIn: 'root'
})
export class SessionService {
  headers: any;
  basePath: any;
  headerWithMultipart: any;


  constructor (private http: HttpClient, private userGetHeader: AuthInterceptorService) {
    this.basePath = environment.apiBaseUrl;
    this.headers = this.userGetHeader.getHeader();
    this.headerWithMultipart = this.userGetHeader.getHeaderWithMultipart();
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  login(data: any) {
    return this.http.post(`${this.basePath}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.basePath}/register`, data);
  }

  isLoggedInUser() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    return localStorage.removeItem('token');
  }

  getBookByISBN(isbn: number) {
    return this.http.get(`${this.basePath}/book/${isbn}`);
  }

  getDccClasses() {
    return this.http.get(`${this.basePath}/dcc-allclasses`);
  }

  getParticularDccClass(code: any) {
    return this.http.get(`${this.basePath}/ddc-class/${code}`);
  }

  getSubclassCode(id: any) {
    return this.http.get(`${this.basePath}/dcc-subclass-code/${id}`);
  }

  getSubDivision() {
    return this.http.get(`${this.basePath}/ddc-subdivision`);
  }

  getSubDivisionCode(unit: any) {
    return this.http.get(`${this.basePath}/ddc-subdivision/${unit}`);
  }

  uploadBookCoverImage(formData) {
    return this.http.post(`${this.basePath}/upload-book-cover`, formData, {
      headers: this.userGetHeader.getHeaderWithMultipart(),
    });
  }

  addBook(data) {
    return this.http.post(`${this.basePath}/addBook`, data);
  }

  viewBooks() {
    return this.http.get(`${this.basePath}/view-books`);
  }

  deleteBook(id: any) {
    return this.http.delete(`${this.basePath}/delete-book/${id}`);
  }
}
