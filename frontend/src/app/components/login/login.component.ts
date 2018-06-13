import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RouterModule, Routes, Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import {LoginModel} from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
          if(this.loginService.user.authorities[0].authority=='ADMIN'){
              this.router.navigate(['admin/employees']);
          }
          else if(this.loginService.user.authorities[0].authority=='USER'){
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
      var regexp = new RegExp('^[a-z]+.[a-z]+@woofwoof.com$');
      return regexp.test(email);
  }


}
