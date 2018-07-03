import {Component, OnInit} from '@angular/core';
import {TaskDTO} from '../../models/taskDTO';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  file: File;
  taskId: number;

  availableTasks: TaskDTO[];

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getUpcomingTasks().subscribe(resp => {
      this.availableTasks = resp;
    });


  }


  onChangeFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];


    console.log(this.file);
  }

  setTaskId(id: number) {
    this.taskId = id;
  }

  getAvailableTaskHour(task: TaskDTO): string {
    return task.startTime.split('T')[1].split(':')[0] + ':' + task.startTime.split('T')[1].split(':')[1];
  }

  taskDone() {
    if (this.file && this.taskId) {
      this.taskService.processTask(this.taskId, this.file).subscribe(resp => {
        this.taskService.getUpcomingTasks().subscribe(resp => {
          this.availableTasks = resp;
        });
      });
    }
  }
}
