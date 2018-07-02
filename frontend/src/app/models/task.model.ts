export class TaskModel {
  id : number;
  name : string;
  hotelReservation : string;
  time : string;
  base64File : string;

  constructor(id : number, description : string, room : string, time : string, base64File : string){
    this.id = id;
    this.name = description;
    this.hotelReservation = room;
    this.time = time;
    this.base64File = base64File;
  }
}
