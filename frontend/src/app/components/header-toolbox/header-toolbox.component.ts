import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserModel} from '../../models/user.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalUserDataComponent} from '../modal-user-data/modal-user-data.component';
import {ModalNotificationsComponent} from '../modal-notifications/modal-notifications.component';
import {NotificationService} from '../../services/notification.service';
import {ModalReservationComponent} from '../modal-reservation/modal-reservation.component';

@Component({
  selector: 'app-header-toolbox',
  templateUrl: './header-toolbox.component.html',
  styleUrls: ['./header-toolbox.component.css']
})
export class HeaderToolboxComponent implements OnInit {

  user: UserModel = new UserModel();

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
    this.notificationService.getNotifications().subscribe(resp => {
      const modalRef = this.modalService.open(ModalNotificationsComponent);
      modalRef.componentInstance.notifications = resp;
    });
  }
}
