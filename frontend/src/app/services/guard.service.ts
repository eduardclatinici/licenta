import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authService.authDetails().subscribe(
      response => {
        if (response.body.authority == 'ADMIN')
          return true;
      });
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
    return false;
  }
}
