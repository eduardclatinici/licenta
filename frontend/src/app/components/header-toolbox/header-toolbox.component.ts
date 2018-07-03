import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserModel} from '../../models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalUserDataComponent} from '../modal-user-data/modal-user-data.component';
import {ModalNotificationsComponent} from '../modal-notifications/modal-notifications.component';
import {NotificationService} from '../../services/notification.service';

import {NotificationDTO} from '../../models/notification.model';

import {ImageModel} from '../../models/image.model';
import {TestModel} from '../../models/test.model';

@Component({
  selector: 'app-header-toolbox',
  templateUrl: './header-toolbox.component.html',
  styleUrls: ['./header-toolbox.component.css']
})
export class HeaderToolboxComponent implements OnInit {

  user: UserModel = new UserModel();
  notifications : NotificationDTO[];
  imageArray : ImageModel[];
  test : TestModel[] = [];

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private authService: AuthService,
              private modalService: NgbModal,
              private notificationService : NotificationService) {
  }

  ngOnInit() {
    this.authService.authDetails().subscribe(
      (response) => {
        this.user = response.body;
        localStorage.removeItem('email');
        localStorage.setItem('email', this.user.email);
        localStorage.removeItem('authority');
        localStorage.setItem('authority', this.user.authority);
      },
      (error) => {

      }
    );

    this.localStorageService.watchStorage().subscribe(response => {
      switch (response) {
        case 'changed' :
          this.user.email = LocalStorageService.getLocalStorageItem('email');
          this.user.authority = LocalStorageService.getLocalStorageItem('authority');
          break;
        case 'deleted' :
          this.user = new UserModel();
          break;
      }
    })
  }

  logout() {
    this.localStorageService.clearLocalStorage();
    this.authService.logout().subscribe(response => {
    });
  }

  isEmployee() {
    return this.user.authority && (this.user.authority == 'EMPLOYEE' || this.user.authority == 'ADMIN')
  }

  showLogin() {
    this.modalService.open(ModalUserDataComponent);
  }

  openNotificationsModal() {
    let a : number = 0;
    this.test = [];
    this.notificationService.getNotifications().subscribe(resp => {
      this.notifications = resp;
      for(let notification of this.notifications) {
        let splitNotif: string[] = notification.filePath.split('\\');
        this.notificationService.getImage(notification.id, splitNotif[splitNotif.length-1]).subscribe(resp1 =>{
          this.test.push(new TestModel(notification,resp1));
          a+=1;
          if(a==this.notifications.length) {
            const modalRef = this.modalService.open(ModalNotificationsComponent);
            modalRef.componentInstance.notifications = this.notifications;
            modalRef.componentInstance.test = this.test;
          }
        })
      }
    });
  }
}
