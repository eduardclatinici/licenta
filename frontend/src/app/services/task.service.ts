import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskDTO} from '../models/taskDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getUpcomingTasks() : Observable<TaskDTO[]> {
    let url = '/api/tasks';
    return this.http.get<TaskDTO[]>(url,{observe: 'body'});
  }

  processTask(taskId : number, file : File) : Observable<any>{
    const url = `/api/tasks/${taskId}`;
    let formData: FormData = new FormData();
    formData.append('file',file);
    return this.http.post(url, formData,{observe:'body'})
  }
}
