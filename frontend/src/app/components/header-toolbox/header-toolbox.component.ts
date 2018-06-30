import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-header-toolbox',
  templateUrl: './header-toolbox.component.html',
  styleUrls: ['./header-toolbox.component.css']
})
export class HeaderToolboxComponent implements OnInit {

  user: UserModel = new UserModel();

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private authService: AuthService) {
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
        console.log('Error in header-toolbox');
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
    this.authService.logout().subscribe(response => {
      this.localStorageService.clearLocalStorage();
      this.user = new UserModel();
    });
  }

  isEmployee() {
    return this.user.authority && (this.user.authority == 'EMPLOYEE' || this.user.authority == 'ADMIN')
  }
}
