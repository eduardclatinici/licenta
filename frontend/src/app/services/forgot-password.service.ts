import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Http} from "@angular/http";

@Injectable()
export class ForgotPasswordService {

  url: string = "/api/app-user/forgot-password";
  errorMessage: Subject<string> = new Subject<string>();
  result: any;

  constructor(private http: Http) {
  }

  resetPassword(email: string) {
    return this.http.post(this.url, email);
  }

}