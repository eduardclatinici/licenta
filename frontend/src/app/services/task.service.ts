import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getUpcomingTasks() : Observable<HttpResponse<any>> {
    let url = '/api/tasks';
    return this.http.get(url,{observe: 'response'});
  }
}
