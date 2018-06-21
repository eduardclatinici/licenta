import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service'
import {SharedData} from './sharedData.service'
import {Http} from '@angular/http/http'
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router,
    private loginService: LoginService, private sharedData:SharedData,
private http: Http) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.user == undefined){
            return this.loginService.getUserDetails('ADMIN');
        }
        if(this.loginService.hasRole('ADMIN')){
            return true
        }

        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable()
export class UserGuard implements CanActivate {

    constructor(private router: Router,
    private loginService: LoginService, private sharedData:SharedData,
private http: Http) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.loginService.user == undefined){
            return this.loginService.getUserDetails('USER');
        }
        if(this.loginService.hasRole('USER')){
            return true
        }

        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
