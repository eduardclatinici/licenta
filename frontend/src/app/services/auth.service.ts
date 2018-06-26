import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LoginModel} from '../models/login.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Authority} from '../models/authority.model';
import {UserDetailsModel} from '../models/userDetails.model';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router : Router, private jwtHelper : JwtHelperService) {
  }

  login(loginModel: LoginModel) :Observable<HttpResponse<any>>{
    let url = '/api/login';
    return this.http.post(url, JSON.stringify(loginModel),{observe:'response'});
  }

  logout() : Observable<HttpResponse<any>> {
    let url = '/logout';
    return this.http.post(url,null,{observe: 'response'});
  }

  authDetails() : Observable<HttpResponse<UserDetailsModel>>{
    let url = '/api/auth-details';
    return this.http.get<UserDetailsModel>(url, {observe: 'response'});
  }

  isTokenExpired(){
    return this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter());
  }

}
