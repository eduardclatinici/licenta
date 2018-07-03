import {HotelReservationDTO} from './hotelReservationDTO.model';

export class TaskDTO {
  id : number;
  name : string;
  room : string;
  startTime : string;
  endTime : string;
  hotelReservation : HotelReservationDTO;
  filePath : string;

  constructor(id : number, description : string, room : string,hotelReservation : HotelReservationDTO, startTime : string, endTime : string , filePath : string){
    this.id = id;
    this.name = description;
    this.room = room;
    this.hotelReservation = hotelReservation;
    this.startTime = startTime;
    this.endTime = endTime;
    this.filePath = filePath;
  }
}
