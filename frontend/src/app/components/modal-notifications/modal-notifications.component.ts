import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationDTO} from '../../models/notification.model';
import {NotificationService} from '../../services/notification.service';
import {ImageModel} from '../../models/image.model';
import {TestModel} from '../../models/test.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-modal-notifications',
  templateUrl: './modal-notifications.component.html',
  styleUrls: ['./modal-notifications.component.scss']
})
export class ModalNotificationsComponent implements OnInit {

  @Input() notifications: NotificationDTO[];
  @Input() test : TestModel[];

  index : number = -1;

  unseenNotif : NotificationDTO[];
  seenNotif : NotificationDTO[];

  unseenTest : TestModel[];
  seenTest : TestModel[];
  constructor(public activeModal: NgbActiveModal, private notificationService: NotificationService, private sanitizer: DomSanitizer) {
  }

  imgSrc: string = './assets/uploads/24/name.jpg';

  ngOnInit() {
    this.notifications.forEach(x=> x.filePath= `./assets/uploads/${x.id}/name.jpg`);
    this.getNotif();
    this.getTestModel();
  }

  seeNotification(id: number) {
    this.notificationService.seeNotification(id).subscribe(resp => {
      // this.notifications = resp;
      // this.test.forEach(x=>this.auxString.push(x.imageArray));
      // this.test= [];
      // let i : number =0;
      // for(let notif of this.notifications){
      //   this.test.push(new TestModel(notif,this.auxString[i]));
      //   i++;
      // }
      // this.notifications.forEach(x=> x.filePath= `./assets/uploads/${x.id}/name.jpg`);
      // this.getNotif()
    })
    this.index = this.test.findIndex(x=>x.notification.id==id);
    this.test[this.index].notification.seen=true;
  }

  getNotif(){
    this.unseenNotif = this.notifications.filter(x=>x.seen==false);
    this.seenNotif = this.notifications.filter(x=>x.seen==true);
  }

  getTestModel(){
    this.unseenTest = this.test.filter(x=>x.notification.seen==false);
    this.seenTest = this.test.filter(x=>x.notification.seen==true);
  }

  getArray(test : TestModel) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/JPEG;base64,${test.imageArray}`);
  }
}
