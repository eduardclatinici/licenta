import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class HotelReservationDTO {
  user : string;
  room: string;
  startDate: NgbDateStruct;
  endDate: NgbDateStruct;
}
