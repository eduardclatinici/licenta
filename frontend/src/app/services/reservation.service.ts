import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {HotelReservationModel} from '../models/hotelReservation.model';
import {Observable} from 'rxjs';

@Injectable()
export class ReservationService {

  constructor(private http: HttpClient) { }

  createReservation(reservationModel : HotelReservationModel) : Observable<HttpResponse<any>>{
    let url = "/api/hotelReservations";
    return this.http.post(url,reservationModel,{observe:'response'});
  }
}
