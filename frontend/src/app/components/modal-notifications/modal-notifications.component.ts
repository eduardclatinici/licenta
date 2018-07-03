import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationDTO} from '../../models/notification.model';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-modal-notifications',
  templateUrl: './modal-notifications.component.html',
  styleUrls: ['./modal-notifications.component.scss']
})
export class ModalNotificationsComponent implements OnInit {

  @Input() notifications: NotificationDTO[];

  unseenNotif : NotificationDTO[];
  seenNotif : NotificationDTO[];
  constructor(public activeModal: NgbActiveModal, private notificationService: NotificationService) {
  }

  imgSrc: string = './assets/uploads/24/name.jpg';

  ngOnInit() {
    this.notifications.forEach(x=> x.filePath= `./assets/uploads/${x.id}/name.jpg`);
    this.getNotif();
  }

  seeNotification(id: number) {
    this.notificationService.seeNotification(id).subscribe(resp => {
      this.notifications = resp;
      this.notifications.forEach(x=> x.filePath= `./assets/uploads/${x.id}/name.jpg`);
      this.getNotif()
    })
  }

  getNotif(){
    this.unseenNotif = this.notifications.filter(x=>x.seen==false);
    this.seenNotif = this.notifications.filter(x=>x.seen==true);
  }

}
