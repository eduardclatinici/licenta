import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {LoginService} from '../../services/login.service';
import {LoginModel} from '../../models/login.model';

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

  constructor(private loginService:LoginService,private router:Router,
              private cookieService:CookieService){}

  ngOnInit(){
    if(this.cookieService.get("emailAddress")!=undefined
      &&this.cookieService.get("password")!=undefined
      &&this.cookieService.get("rememberMe")!=undefined){
      this.loginModel.emailAddress = this.cookieService.get("emailAddress");
      this.loginModel.password = this.cookieService.get("password");
      this.rememberMe = true;
    }
    this.loginService.errorMessage.subscribe(message=>{
      this.errorMessage = message;
    });
    this.loginService.loggedIn.subscribe(loggedIn=>{
      localStorage.setItem("loggedInDisplay","normal");
      if(this.loginService.user.authority=='ADMIN'){
        this.router.navigate(['admin/employees']);
      }
      else if(this.loginService.user.authority[0]=='USER'){
        this.router.navigate(['user/home']);
      }
    });
  }

  togglePassword(){
    this.passwordType = !this.passwordType;
  }

  login(){
    if(this.rememberMe){
      this.cookieService.put("emailAddress",this.loginModel.emailAddress);
      this.cookieService.put("password",this.loginModel.password);
      this.cookieService.put("rememberMe","true");
    }
    if(this.isValidEmail(this.loginModel.emailAddress)){
      this.loginService.login(this.loginModel);
    }
  }

  isValidEmail(email:string){
    this.errorMessage = undefined;
    var regexp = new RegExp('^[a-z]+.[a-z]+[a-z].[a-z]{1,3}$');
    return regexp.test(email);
  }



}
