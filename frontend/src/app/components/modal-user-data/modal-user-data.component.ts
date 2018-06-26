import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LoginModel} from '../../models/login.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {SharedDataService} from '../../services/sharedData.service';

@Component({
  selector: 'app-modal-user-data',
  templateUrl: './modal-user-data.component.html',
  styleUrls: ['./modal-user-data.component.css']
})
export class ModalUserDataComponent implements OnInit {

  rememberMe: boolean = false;
  passwordType: boolean = true;
  errorMessage: string;
  loginModel: LoginModel = new LoginModel();

  constructor(private authService: AuthService, private router: Router,
              private cookieService: CookieService, public activeModal: NgbActiveModal,
              private localStorageService : LocalStorageService, private sharedDataService : SharedDataService) {
  }

  ngOnInit() {
    this.getRememberedUserDataIfExists();
  }

  togglePassword(){
    this.passwordType = !this.passwordType;
  }

  login() {
    if (this.isValidEmail(this.loginModel.emailAddress)) {
      this.authService.login(this.loginModel).subscribe(
        response => {

          this.localStorageService.setLocalStorageItem(LocalStorageService.currentUserToken, response.headers.get('authorization'));
          this.localStorageService.setLocalStorageItem('email', this.loginModel.emailAddress);

          this.rememberUserIfTrue();

          this.activeModal.close();
        }, error => {
          this.errorMessage = error._body;
        }
      );

    }
  }

  getRememberedUserDataIfExists() {
    const emailAddress = this.cookieService.get('emailAddress');
    const password = this.cookieService.get('password');
    if (emailAddress != undefined && password != undefined) {
      this.loginModel.emailAddress = emailAddress;
      this.loginModel.password = password;
      this.rememberMe = true;
    }
  }

  private rememberUserIfTrue() {
    if (this.rememberMe) {
      this.cookieService.put('emailAddress', this.loginModel.emailAddress);
      this.cookieService.put('password', this.loginModel.password);
    }
    else {
      this.cookieService.removeAll();
    }
  }

  isValidEmail(email: string) {
    this.errorMessage = undefined;
    var regexp = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])');
    return regexp.test(email);
  }


}
