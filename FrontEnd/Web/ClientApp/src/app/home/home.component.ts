import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../shared/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, ValidationErrors, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {
  isSubmitted = false;
  isHidden: boolean = true;
  errorMessage = '';
  updateForm: FormGroup = this.formControls.group({
    name: ['', Validators.required],
    companyName: ['', Validators.required],
    phone: ['', Validators.required],
    age: ['', Validators.required]
  });

   constructor(
    public router: Router,
    public service: UserService,
    public auth: AuthService,
    private toastr: ToastrService
    , public formControls: FormBuilder
  ) {
     //
     // this.homeForm = this.formControls.group({
     //Name: ['', Validators.required],
     //  CompanyName: ['', Validators.required],
     //    Phone: ['', Validators.required],
     //      Age: ['', Validators.required]
     //})
     // debugger;
     var res = this.auth.getUserProfile();
     if (res == null) {
       this.router.navigate(['/login']);
     }
     else {
      // debugger;
       this.updateForm.value.name = this.auth.currentUserData.name;
       this.updateForm.value.companyName = this.auth.currentUserData.companyName;
       this.updateForm.value.age = this.auth.currentUserData.age;
       this.updateForm.value.phone = this.auth.currentUserData.phone;
         }
  }
  ngOnInit() {
  //  debugger;
   // this.homeForm = this.auth.currentUserData;   // debugger;
  }
  ngAfterViewInit() {
    //debugger;
    //this.homeForm = this.auth.currentUserData;
   // debugger;

  }

  onupdate() {
    debugger;
   // this.issubmitted = true;
    //if (this.service.updateform.invalid) {
    //  const result = [];
    //  object.keys(this.service.updateform.controls).foreach(key => {

        //const controlerrors: validationerrors = this.service.updateform.get(key).errors;
        //if (controlerrors) {
        //  (this.service.updateform.errors).foreach(keyerror => {
        //    result.push({
        //      'control': key,
        //      'error': keyerror,
        //      'value': controlerrors[keyerror]
        //    });
        //  });
        //}
      //});
      //return result;
  //  }
  //else
    {
      debugger;
      this.service.updateForm.value.companyName = sessionStorage.getItem("CompanyName");
      this.service.updateForm.value.name = this.updateForm.value.name;
      this.service.updateForm.value.phone = this.updateForm.value.phone;
      this.service.updateForm.value.age = this.updateForm.value.age;
      this.service.update().subscribe(
        (res: any) => {

          if (res.success) {
           
            this.toastr.success('updated succeeded', 'update account');
         
            this.router.navigate(['/home']);
          }
          else {
             res.errormessage.foreach(element => {
              ////debugger;
             // this.errormessage = element.description;

            });
            //this.toastr.warning(this.errormessage, 'update account');
          }

        },
        (err: any) => {
           this.toastr.error(err.message, 'update account');
         // this.errormessage = err.message;
        }
      );
    }
  }



}


