import { Component, OnInit } from '@angular/core';
import {TaskModel} from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  file: File;
  taskId: number;

  taskArray : TaskModel[] = [
    { id: 0, name: 'Mancare', hotelReservation: 'H2', time: '20:00', base64File: 'file' },
    { id: 1, name: 'Plimbare', hotelReservation: 'H8', time: '08:00', base64File: 'file' },
    { id: 2, name: 'Asistenta', hotelReservation: 'H7', time: '10:00', base64File: 'file' },
    { id: 3, name: 'Mancare', hotelReservation: 'H1', time: '11:30', base64File: 'file' },
    { id: 4, name: 'Plimbare', hotelReservation: 'H3', time: '21:00', base64File: 'file' },
    { id: 5, name: 'Asistenta', hotelReservation: 'H9', time: '20:30', base64File: 'file' },
    { id: 6, name: 'Mancare', hotelReservation: 'H6', time: '09:15', base64File: 'file' },
    { id: 7, name: 'Plimbare', hotelReservation: 'H5', time: '14:45', base64File: 'file' },
    { id: 8, name: 'Asistenta', hotelReservation: 'H4', time: '17:15', base64File: 'file' },
  ];

  constructor() { }

  ngOnInit() {

  }


  onChangeFile(event : EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];

    console.log(this.file);

  }

  setTaskId(id: number) {
    console.log(id);
    this.taskId = id;
  }
}
