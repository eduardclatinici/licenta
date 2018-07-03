import {NotificationDTO} from './notification.model';
import {ImageModel} from './image.model';

export class TestModel{
  notification : NotificationDTO;
  imageArray : string;

  constructor( notification : NotificationDTO, imageArray : string){
    this.notification = notification;
    this.imageArray = imageArray;
}
}
