import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.css']
})
export class ModalReservationComponent implements OnInit {

  @Input() options;
  @Input() guestOptions;
  @Input() selectedOption : String;
  @Input() selectedGuestOption : Number;
  @Input() dropdownType : String;
  @Input() title : String;

  constructor() { }

  ngOnInit() {
  }

  
  getOtherOptions(){
    return this.options.filter(x => x != this.selectedOption)
  }

  getOtherGuestOptions(){
    return this.guestOptions.filter(x => x != this.selectedGuestOption)
  }

}
