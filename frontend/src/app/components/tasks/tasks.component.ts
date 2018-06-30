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
    { id: 0, description: 'Mancare', room: 'H2', time: '20:00', base64File: 'file' },
    { id: 1, description: 'Plimbare', room: 'H8', time: '08:00', base64File: 'file' },
    { id: 2, description: 'Asistenta', room: 'H7', time: '10:00', base64File: 'file' },
    { id: 3, description: 'Mancare', room: 'H1', time: '11:30', base64File: 'file' },
    { id: 4, description: 'Plimbare', room: 'H3', time: '21:00', base64File: 'file' },
    { id: 5, description: 'Asistenta', room: 'H9', time: '20:30', base64File: 'file' },
    { id: 6, description: 'Mancare', room: 'H6', time: '09:15', base64File: 'file' },
    { id: 7, description: 'Plimbare', room: 'H5', time: '14:45', base64File: 'file' },
    { id: 8, description: 'Asistenta', room: 'H4', time: '17:15', base64File: 'file' },
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
