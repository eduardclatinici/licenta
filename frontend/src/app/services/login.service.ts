import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LoginModel } from './../models/login.model';
import { Injectable,Input, NgZone } from '@angular/core';
import {UserDetailsModel} from "../models/userDetails.model";
import {Subject} from "rxjs";
import {Http} from '@angular/http'
import {SharedData} from './sharedData.service'
import { Router} from '@angular/router';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class LoginService {
    url: string = "/api/login";
    url2: string = "/api/app-user/userdetails";
    errorMessage: Subject<string> = new Subject<string>();
    loggedIn: Subject<boolean> = new Subject<boolean>();
    user: UserDetailsModel;
    constructor(private router: Router,private http:Http,
         private sharedData: SharedData,private zone:NgZone,
        private cookieService: CookieService){}

    login(loginModel:LoginModel) {
        this.url = "/api/login";

        this.http.post(this.url,JSON.stringify(loginModel)).subscribe(
            response => {
            localStorage.setItem('currentUserToken', response.headers.get("authorization"));
            localStorage.setItem('currentUserEmail', loginModel.emailAddress);
            this.user = response.json() as UserDetailsModel;
            this.loggedIn.next(true);
        },error => {
            if(error.headers._headers.has("x-active")
                &&error.headers._headers.get("x-active")[0]=="true"){
                this.router.navigate(["/change-password"]);
            }
            this.errorMessage.next(error._body);
            error.catch
        }
    );
    }

     hasRole(role:String){
        if (this.user != undefined && localStorage.getItem('currentUserToken') &&
            this.user.authority==role) {
            return true;
        }
    }

    getUserDetails(role:String){
        this.url2 = "/api/user/auth-details";
        let response:Observable<boolean>
         = this.http.get(this.url2,
        this.sharedData.jwt()).pipe(map(response => response.json()))
        .pipe(map((data)=>{
            this.user = data as UserDetailsModel;
            if(this.hasRole(role)){
                return true;
            }
            this.goToLogginPage()
            return false;
        })).pipe(catchError(e=>{
            if(e.headers.has("authorization")
                && e.headers.get("authorization") == 'expired'){
                    this.logout();
                    if(this.cookieService.get("rememberMe")!=undefined
                    &&this.cookieService.get("emailAddress")!=undefined
                    &&this.cookieService.get("password")!=undefined){
                        let model: LoginModel = new LoginModel();
                        model.emailAddress = this.cookieService.get("emailAddress");
                        model.password = this.cookieService.get("password");
                        this.login(model);
                    }

                }
            return this.goToLogginPage();
        }));


        return response;
      }

    goToLogginPage(){
        this.router.navigate(['/']);
        return of(false);
    }

    getAuthorityRequest(){
        this.url2 = "/api/app-user/userdetails";

        return this.http.get(this.url2,
       this.sharedData.jwt()).pipe(map(response => response.json()));
    }


    logout(){
        localStorage.clear();
        this.user = undefined;

        this.http.post("/logout",null,this.sharedData.jwt()).pipe(map(response => response.status)).subscribe(status=>{
            if(status==200){
                console.log("logout");
            }
        })
        this.router.navigate(["/"]);
    }
}


