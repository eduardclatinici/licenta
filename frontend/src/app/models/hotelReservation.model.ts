import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class HotelReservationModel{
  roomOption : String;
  guestsNumber: String[];
  dateFrom: NgbDateStruct;
  dateTo: NgbDateStruct;
  userEmail: String;
}
