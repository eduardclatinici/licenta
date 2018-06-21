import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-header-toolbox',
  templateUrl: './header-toolbox.component.html',
  styleUrls: ['./header-toolbox.component.css']
})
export class HeaderToolboxComponent implements OnInit {

  loggedInDisplay:string;
  email:string;

  constructor(private loginService:LoginService,private router: Router){}

  ngOnInit(){
    this.update();
  }

  update(){
    this.email = localStorage.getItem('currentUserEmail');
    let item:string = localStorage.getItem('loggedInDisplay');
    this.loggedInDisplay = item!=null?item:"none";

  }

  logout(){
    this.update();
    this.loginService.logout();
  }

}
