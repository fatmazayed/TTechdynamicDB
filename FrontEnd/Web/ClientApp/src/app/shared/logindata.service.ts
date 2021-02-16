import { Injectable } from '@angular/core';
//import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
//import { Socialusers } from '../Models/socialusers'
//import { SocialloginService } from '../shared/sociallogin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class LogindataService {
  response;
 // socialusers = new Socialusers();

  constructor(
   // public OAuth: AuthService,
    //private SocialloginService: SocialloginService ,
   
    private router: Router, private toastr: ToastrService) { }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    //if (socialProvider === 'facebook') {
    //  socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    //}
    //else if (socialProvider === 'google') {
    //  socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    //}

    //this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
    //  //debugger;
    //  //console.log(socialProvider, socialusers);
    //  //console.log(socialusers);
    //  this.Savesresponse(socialusers);

    //});
  }

  //Savesresponse(socialusers: Socialusers) {
  //  //debugger;
  //  this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {
  //    //debugger;
  //    //console.log(res); 
  //    if (res.success == true) {
  //      this.socialusers = res;
  //      this.response = res.userDetail;
  //      localStorage.setItem('access_token', res.userDetail.token);
  //      localStorage.setItem('_id', res.userDetail.id);
  //      this.router.navigate(['/Home']);
  //    }
  //    else {
  //      this.toastr.error(res.errorMessage);
  //    }
  //    //localStorage.setItem('socialusers', JSON.stringify( this.socialusers));    
  //    //console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));    
  //  }, (error: any) => {
  //    this.toastr.error(error);
  //  })
  //}

  logOut(): void {
  //  this.OAuth.signOut();
  //  //console.log('User has signed our');
  }
}
