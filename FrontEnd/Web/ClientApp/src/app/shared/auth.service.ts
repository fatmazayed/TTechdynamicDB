import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './User';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LogindataService } from './logindata.service';
import { URLAPIService } from './urlapi.service';
import { UserInfo } from './UserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //endpoint: string = 'http://localhost:44393/api';
  endpoint: string = this.URLservice.ApiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  registerForm: FormGroup;
  currentUserData: UserInfo;
  constructor(private URLservice: URLAPIService, private logindataser: LogindataService, private http: HttpClient, public router: Router, private toastr: ToastrService) { }
  // Sign-up
  signUp(user: User): Observable<any> {
    debugger;
    let api = `${this.endpoint}/Auth/Registration`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }
  ////////////////////////////////////////
  // Sign-in
  signIn(user: User, IsRemember: any) {
     
    return this.http.post<any>(`${this.endpoint}/Auth/login`, user)
      .subscribe(
        (res: any) => {
          //
          debugger;
          if (res.result.value.success == true) {
           
 //this.currentUserData. = res.result.value;
            if (IsRemember == true) {
              localStorage.setItem('access_token', res.result.value.auth_token);
              sessionStorage.setItem('CompanyName', res.result.value.companyName);
              sessionStorage.setItem('UserId', res.result.value.userId);
            }
            else {
              sessionStorage.setItem('access_token', res.result.value.auth_token);
              sessionStorage.setItem('CompanyName', res.result.value.companyName);
              sessionStorage.setItem('UserId', res.result.value.userId);
            }
            this.router.navigate(['/home']);
          }
          else {
            this.toastr.warning(res.message, "Login");
          }
        },
        (err: any) => {
          this.toastr.error(err.message, "Login");
        })
  }
  // User profile
  getUserProfile() {
    //debugger;
    let info = new UserInfo()
    info.userId = parseInt(sessionStorage.getItem("UserId"));
    info.companyName = sessionStorage.getItem("CompanyName");
    return this.http.post<any>(`${this.endpoint}/Auth/GetUserProfile`, info)
      .subscribe(
        (res: any) => {
          //
          //debugger;
          this.currentUserData = res.currentUserData;
        },
        (err: any) => {
        });     
 }

   
  //////////////////////////////////////////////////////
  getToken() {
    if (localStorage.getItem('access_token') != null) {
      return localStorage.getItem('access_token');
    }
    else {
      return sessionStorage.getItem('access_token');
    }
  }
  ////////////////////////////////////////////////
  get isLoggedIn(): boolean {
    let authToken = "";
    if (localStorage.getItem('access_token') != null) {
      authToken = localStorage.getItem('access_token');
    }
    else {
      authToken = sessionStorage.getItem('access_token');
    }
    return (authToken !== null) ? true : false;
  }
  //////////////////////////////////////////////
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let remove_id = localStorage.removeItem('_id');
    let role_id = localStorage.removeItem('role');

    let removeTokensession = sessionStorage.removeItem('access_token');
    let remove_idsession = sessionStorage.removeItem('_id');
    let role_idsession = sessionStorage.removeItem('role');

    this.logindataser.logOut();
    if ((removeToken == null && remove_id == null && role_id == null) || (removeTokensession == null && remove_idsession == null && role_idsession == null)) {
      this.router.navigate(['login']);
    }
  }
  ///////////////////////////////////////////////
   
  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
