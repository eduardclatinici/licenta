import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {

  constructor(private http: HttpClient) { }

  getFullyBookedDaysOfMonth(roomType : string, year : number, month : number,) :Observable<number[]>{
    let url = '/api/fullyBookedDaysOfMonth'+'?roomType='+roomType+'&year='+year+'&month='+month;
    return this.http.get<number[]>(url,{observe:'body'});
  }
}
