import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {UserModel} from '../../models/user.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-modal-user-data',
  templateUrl: './modal-user-data.component.html',
  styleUrls: ['./modal-user-data.component.css']
})
export class ModalUserDataComponent implements OnInit {
//login
  rememberMe: boolean = false;
  errorMessage: string;
  registerModel: UserModel = new UserModel();
  loginModel : UserModel = new UserModel();

  currentState: number = 1;

  constructor(private authService: AuthService, private router: Router,
              private cookieService: CookieService, public activeModal: NgbActiveModal,
              private localStorageService : LocalStorageService) {
  }

  ngOnInit() {
    this.getRememberedUserDataIfExists();
  }

  login() {
    if (this.isValidEmail(this.loginModel.email)) {
      console.log(this.loginModel);
      this.authService.login(this.loginModel).subscribe(
        response => {

          this.localStorageService.setLocalStorageItem('authToken', response.headers.get('authorization'));
          this.localStorageService.setLocalStorageItem('email', this.loginModel.email);
          this.authService.authDetails().subscribe(resp =>{
            this.localStorageService.setLocalStorageItem('authority', resp.body.authority)
          }, err=>{
            console.log("error requesting for authDetails after login")
          });

          this.rememberUserIfTrue();

          this.activeModal.close();
        }, error => {
          this.errorMessage = "Credentiale invalide";
          console.log(this.errorMessage)
        }
      );

    }
    else{
      this.errorMessage = "Adresa de email nu este in formatul corect"
    }
  }

  register(){
    if(this.isValidEmail(this.registerModel.email)){
      this.authService.register(this.registerModel).subscribe(
        response =>{
          this.loginModel = this.registerModel;
          this.login();
        },
        err =>{
          console.log('Error in register');
          console.log(err);
        }
      )
    }
    else{
      this.errorMessage = "Adresa de email nu este in formatul corect"
    }
  }

  getRememberedUserDataIfExists() {
    const email = this.cookieService.get('email');
    const password = this.cookieService.get('password');
    if (email != undefined && password != undefined) {
      this.loginModel.email = email;
      this.loginModel.password = password;
      this.rememberMe = true;
    }
  }

  private rememberUserIfTrue() {
    if (this.rememberMe) {
      this.cookieService.put('email', this.loginModel.email);
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

  registerToLoginModel(registerModel : UserModel) : UserModel{
    let loginModelAux : UserModel = new UserModel();
    loginModelAux.email = registerModel.email;
    loginModelAux.password = registerModel.password;
    return loginModelAux;
  }


}
