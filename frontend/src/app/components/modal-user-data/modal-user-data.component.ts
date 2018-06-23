import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LoginService} from '../../services/login.service';
import {LoginModel} from '../../models/login.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private loginService: LoginService, private router: Router,
              private cookieService: CookieService, public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    if (this.cookieService.get('emailAddress') != undefined
      && this.cookieService.get('password') != undefined
      && this.cookieService.get('rememberMe') != undefined) {
      this.loginModel.emailAddress = this.cookieService.get('emailAddress');
      this.loginModel.password = this.cookieService.get('password');
      this.rememberMe = true;
    }
    this.loginService.errorMessage.subscribe(message => {
      this.errorMessage = message;
    });
    this.loginService.loggedIn.subscribe(loggedIn => {
      localStorage.setItem('loggedInDisplay', 'normal');
      if (this.loginService.user.authority == 'ADMIN') {
        this.router.navigate(['admin/employees']);
      }
      else if (this.loginService.user.authority == 'USER') {
        this.router.navigate(['user/home']);
      }
    });
  }

  togglePassword() {
    this.passwordType = !this.passwordType;
  }

  login() {
    if (this.isValidEmail(this.loginModel.emailAddress)) {
      this.loginService.login(this.loginModel);
      if (this.rememberMe) {
        this.cookieService.put('emailAddress', this.loginModel.emailAddress);
        this.cookieService.put('password', this.loginModel.password);
        this.cookieService.put('rememberMe', 'true');
      }
    }
  }

  isValidEmail(email: string) {
    this.errorMessage = undefined;
    var regexp = new RegExp('^[a-z]+.[a-z]+[a-z].[a-z]{1,3}$');
    return regexp.test(email);
  }


}
