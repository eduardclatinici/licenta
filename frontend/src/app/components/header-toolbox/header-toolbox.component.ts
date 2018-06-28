import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {UserDetailsModel} from "../../models/userDetails.model";

@Component({
  selector: 'app-header-toolbox',
  templateUrl: './header-toolbox.component.html',
  styleUrls: ['./header-toolbox.component.css']
})
export class HeaderToolboxComponent implements OnInit {

  email: string;
  user: UserDetailsModel = new UserDetailsModel();

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authDetails().subscribe(
      (response) => {
        this.user = response.body;
        console.log(this.user);
        localStorage.removeItem('email');
        localStorage.setItem('email', this.user.email);
      },
      (error) => {
        console.log('Error');
      }
    );

    this.localStorageService.watchStorage().subscribe(response => {
      switch (response) {
        case 'email' :
          this.user.email = LocalStorageService.getLocalStorageItem(response);
          break;
        case 'deleted' :
          this.user.email = undefined;
          break;
        default:
          console.log(response);
      }
    })
  }

  // this.email = LocalStorageService.email;
  // if(this.email == undefined) {
  //   this.localStorageService.watchStorage().subscribe(response => {
  //     switch (response) {
  //       case 'email' :
  //         this.email = LocalStorageService.getLocalStorageItem(response);
  //         break;
  //       case 'deleted' :
  //         this.email = undefined;
  //         break;
  //     }
  //   })
  // }


  logout() {
    this.authService.logout().subscribe(response => {
      this.localStorageService.clearLocalStorage();
      this.user = new UserDetailsModel();
    });
  }

}
