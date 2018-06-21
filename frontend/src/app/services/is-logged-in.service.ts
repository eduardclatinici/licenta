import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { UserDetailsModel } from './../models/userDetails.model';
import {Http} from '@angular/http';
import {SharedData} from './sharedData.service'
import { map } from 'rxjs/operators';

@Injectable()
export class IsLoggedInService implements CanActivate{

  url: string = "api/user/auth-details";

  constructor(private router: Router, private http:Http,
      private loginService:LoginService, private sharedData:SharedData) { }

  getUserDetails(){
    console.log("hehe");
      return this.http.get(this.url,
      this.sharedData.jwt()).pipe(map(response => response.json()))
      .pipe(map((data)=>{
          this.loginService.user = data as UserDetailsModel;
          if(this.loginService.user.authority=='ADMIN')
              this.router.navigate(['/admin/home']);
          return false;
      }));
    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (!localStorage.getItem('currentUserToken')) {
          return true;
      }

      if(this.loginService.user == undefined){
          return this.getUserDetails();
      }

      return false;
  }
}


