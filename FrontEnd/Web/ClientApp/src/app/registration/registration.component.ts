import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../shared/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LogindataService } from '../shared/logindata.service';
import { FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app- registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
@Injectable({
  providedIn:'root'
})
export class RegistrationComponent implements OnInit {
  isSubmitted = false;
  isHidden: boolean = true;
  errorMessage = '';
  signinForm: FormGroup;
  constructor( 
    public router: Router,
   //public authService: AuthService,
    public service: UserService,
    private toastr: ToastrService
    ,public formControls: FormBuilder
  )
  {

  }

  ngOnInit() {
    //this.service.registerForm.reset();
  }
  
  onregister() {
    debugger;
    this.isSubmitted = true;
    if (this.service.registerForm.invalid) {
      const result = [];
      Object.keys(this.service.registerForm.controls).forEach(key => {

        const controlErrors: ValidationErrors = this.service.registerForm.get(key).errors;
        if (controlErrors) {
          (this.service.registerForm.errors).forEach(keyError => {
            result.push({
              'control': key,
              'error': keyError,
              'value': controlErrors[keyError]
            });
          });
        }
      });
        return result;
    }
    else {
      this.service.register().subscribe(
        (res: any) => {

          if (res.success) {
            this.isHidden = true;
            this.toastr.success('Registration Succeeded', 'Create New Account');
            this.signinForm = this.formControls.group({
              email: this.service.registerForm.value.Email,
              CompanyName: this.service.registerForm.value.CompanyName
            });
            this.router.navigate(['/home']);
          }
          else {
            this.isHidden = false;
            res.errorMessage.forEach(element => {
              ////debugger;
              this.errorMessage = element.description;
            
            });
            this.toastr.warning(this.errorMessage, 'Create New Account');
          }

        },
        (err: any) => {
          this.isHidden = false;
          this.toastr.error(err.message, 'Create New Account');
          this.errorMessage = err.message;
        }
      );
    }
  }
  
  onReset() {
    this.isSubmitted = false;
    this.service.registerForm.reset();
  }
  
}


