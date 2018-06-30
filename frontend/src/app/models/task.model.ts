export class TaskModel {
  id : number;
  description : string;
  room : string;
  time : string;
  base64File : string;

  constructor(id : number, description : string, room : string, time : string, base64File : string){
    this.id = id;
    this.description = description;
    this.room = room;
    this.time = time;
    this.base64File = base64File;
  }
}
