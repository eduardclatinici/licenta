import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserDetailsModel} from "./models/userDetails.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WoofWoof';

  user: UserDetailsModel = new UserDetailsModel();

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
  }
}
