import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserModel} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WoofWoof';

  user: UserModel = new UserModel();

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
  }
}
