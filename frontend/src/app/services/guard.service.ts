import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // let can : boolean = false;
    if(LocalStorageService.getLocalStorageItem('authority')=='ADMIN')
      return true;
    return false;
    // let promise = this.authService.authDetails().toPromise();
    // this.authService.authDetails().toPromise().then(
    //   response => {
    //     if (response.body.authority == 'ADMIN') {
    //       can = true;
    //       console.log("aici1");
    //     }
    //     else{
    //       this.router.navigate(['home']);
    //       console.log("aici2");
    //
    //     }
    //   });
    // return can;
  }
}

@Injectable()
export class EmployeeGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.authDetails().subscribe(
      response => {
        if (response.body.authority == 'EMPLOYEE')
          return true;
      });
    this.router.navigate(['home']);
    return false;
  }
}

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.authDetails().subscribe(
      response => {
        if (response.body.authority == 'USER')
          return true;
      });
    this.router.navigate(['home']);
    return false;
  }
}
