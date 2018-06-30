import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router : Router, private jwtHelper : JwtHelperService) {
  }

  login(loginModel: UserModel) :Observable<HttpResponse<any>>{
    let url = '/api/login';
    return this.http.post(url, JSON.stringify(loginModel),{observe:'response'});
  }

  logout() : Observable<HttpResponse<any>> {
    let url = '/logout';
    return this.http.post(url,null,{observe: 'response'});
  }

  authDetails() : Observable<HttpResponse<UserModel>>{
    let url = '/api/auth-details';
    return this.http.get<UserModel>(url, {observe: 'response'});
  }

  isTokenExpired(){
    return this.jwtHelper.isTokenExpired(this.jwtHelper.tokenGetter());
  }

  register(registerModel : UserModel) : Observable<HttpResponse<any>>{
    let url = '/api/register';
    return this.http.post(url, JSON.stringify(registerModel), {observe:'response'});
  }

}
