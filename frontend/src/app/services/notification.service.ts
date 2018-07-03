import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationDTO} from '../models/notification.model';
import {ImageModel} from '../models/image.model';

@Injectable()
export class NotificationService {

  constructor(private http : HttpClient) { }

  getNotifications() : Observable<NotificationDTO[]>{
    const url = '/api/notifications';
    return this.http.get<NotificationDTO[]>(url,{observe:'body'});
  }

  seeNotification(id : number) : Observable<NotificationDTO[]>{
    const url = `/api/notifications/${id}`;
    return this.http.post<NotificationDTO[]>(url, null, {observe:'body'});
  }

  getImage(id:number, name : string) : Observable<string>{
      return this.http.get(`/api/image/${id}/${name}`,{observe:'body', responseType:'text'} )
  }
}
