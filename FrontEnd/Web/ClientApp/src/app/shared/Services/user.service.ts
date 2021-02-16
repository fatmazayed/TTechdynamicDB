import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLAPIService } from 'src/app/shared/urlapi.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //BaseURL:String = "http://localhost:44393/api";
  registerForm: FormGroup= this.formBuilder.group({
    Name: ['', Validators.required],
    Age: ['', Validators.required],
    Phone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    CompanyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(7)]],
    Password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    ConfirmPassword: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
  }, { validator: this.passwordConfirming });


  updateForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    phone: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    companyName: ['']
    });
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private BaseURL: URLAPIService) {
    
  }

  passwordConfirming(c: FormGroup) {
    let confirmpswrdcrtl = c.get('ConfirmPassword');
    if (confirmpswrdcrtl.errors == null || 'passwordMismatch' in confirmpswrdcrtl.errors) {
      if (c.get('Password').value !== confirmpswrdcrtl.value)
        confirmpswrdcrtl.setErrors({ passwordMismatch: true });
      else
        confirmpswrdcrtl.setErrors(null);
    }
  }

  register() {
    debugger;
    var body = {
      Name: this.registerForm.value.Name,
      Age: parseInt(this.registerForm.value.Age),
      Phone: this.registerForm.value.Phone,
     Password: this.registerForm.value.Password,
      CompanyName: this.registerForm.value.CompanyName,
    }
    return this.http.post(this.BaseURL.ApiUrl + '/Auth/Registration', body);
  }

  update() {
    debugger;
    var body = {
      Id: parseInt(sessionStorage.getItem("UserId")),
      Name: this.updateForm.value.name,
      Age: parseInt(this.updateForm.value.age),
      Phone: this.updateForm.value.phone,
      CompanyName: this.updateForm.value.companyName,
    }
    return this.http.post(this.BaseURL.ApiUrl + '/Auth/update', body);
  }


   
}

 
