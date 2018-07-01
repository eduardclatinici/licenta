import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import {ModalReservationComponent} from '../modal-reservation/modal-reservation.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ModalUserDataComponent} from '../modal-user-data/modal-user-data.component';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-pet-hotel',
  templateUrl: './pet-hotel.component.html',
  styleUrls: ['./pet-hotel.component.css']
})
export class PetHotelComponent implements OnInit {

  options = ["Economy (Dog)","Regular (Dog)","Vip (Dog)","Economy (Cat)","Regular (Cat)","Vip (Cat)"];

  constructor(private router : Router,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  reservationForm(id: number){
    if(!LocalStorageService.getAuthorizationToken()){
      this.modalService.open(ModalUserDataComponent);
    }
    else{
      const modalRef = this.modalService.open(ModalReservationComponent);
      modalRef.componentInstance.selectedRoomType=this.options[id];
      modalRef.result.then().catch((error) => {
        console.log(error);
      });
    }
  }

}
