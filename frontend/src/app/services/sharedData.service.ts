import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
@Injectable()
export class SharedData {
  jwt() {
    const currentUserToken = localStorage.getItem('currentUserToken');
    if (currentUserToken) {
      const headers = new Headers({ 'Authorization':  currentUserToken ,
        'Content-type': 'application/json'});
      return new RequestOptions({ headers: headers });
    }
  }
}
