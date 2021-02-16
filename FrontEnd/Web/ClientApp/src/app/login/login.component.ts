import { Component, EventEmitter, OnInit, Output, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { LogindataService } from '../shared/logindata.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  isSubmitted = false;
  IsRemember: false;
  constructor(public loginser: LogindataService, public formControls: FormBuilder, public authService: AuthService,
    public router: Router) {
    this.signinForm = this.formControls.group({
      Name: ['', Validators.required],
      CompanyName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ngOnInit() {
    //if (this.authService.isLoggedIn == true) {
    //  this.router.navigate(['/home']);
    //}
  }
  setchange(event) {
    //debugger;
    this.IsRemember = event.target.checked;
  }
  loginUser() {
    this.isSubmitted = true;
    if (this.signinForm.invalid) {
      return;
    }
   var res = this.authService.signIn(this.signinForm.value, this.IsRemember);
  //  //debugger;
  }
}
