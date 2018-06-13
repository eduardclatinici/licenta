import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-pet-hotel',
  templateUrl: './pet-hotel.component.html',
  styleUrls: ['./pet-hotel.component.css']
})
export class PetHotelComponent implements OnInit {

  title : String = "Rezervare";
  dropdownType : String = "Tipul camerei:";
  selectedOption : String;
  selectedGuestOption : Number = 1;
  options = ["Economy (Dog)","Regular (Dog)","Vip (Dog)","Economy (Cat)","Regular (Cat)","Vip (Cat)"];
  guestOptions = [1,2,3,4];

  authority : String = "user";
  constructor() { }

  ngOnInit() {
  }

  reservationForm(id: number){
    $('#exampleModalCenter').modal();
    this.selectedOption = this.options[id]
  }

}
