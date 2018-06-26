import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-header-toolbox',
  templateUrl: './header-toolbox.component.html',
  styleUrls: ['./header-toolbox.component.css']
})
export class HeaderToolboxComponent implements OnInit {

  email:string;

  constructor(private router: Router, private localStorageService : LocalStorageService, private authService : AuthService){}

  ngOnInit(){

    this.email = LocalStorageService.email;
    if(this.email == undefined) {
      this.localStorageService.watchStorage().subscribe(response => {
        switch (response) {
          case 'email' :
            this.email = LocalStorageService.getLocalStorageItem(response);
            break;
          case 'deleted' :
            this.email = undefined;
            break;
        }
      })
    }

  }

  logout(){
    this.authService.logout().subscribe(response => {
      console.log(response);
      if (response.status == 200) {
        this.localStorageService.clearLocalStorage();
      }
    });
  }

}
