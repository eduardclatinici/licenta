import {Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service'

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }

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
    private loginService: LoginService) { }

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

@Injectable()
export class AuthService{
  constructor(){}

  public getAuthorizationToken(){
    return localStorage.getItem('currentUserToken')
  }


}
