import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class HotelReservationModel{
  roomType : String;
  numberOfGuests: number;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
}
