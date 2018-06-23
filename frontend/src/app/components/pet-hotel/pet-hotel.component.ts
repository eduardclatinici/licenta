import { Component, OnInit } from '@angular/core';
import 'bootstrap';
import { LoginService } from 'src/app/services/login.service';
import {ModalReservationComponent} from '../modal-reservation/modal-reservation.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ModalUserDataComponent} from '../modal-user-data/modal-user-data.component';

@Component({
  selector: 'app-pet-hotel',
  templateUrl: './pet-hotel.component.html',
  styleUrls: ['./pet-hotel.component.css']
})
export class PetHotelComponent implements OnInit {

  options = ["Economy (Dog)","Regular (Dog)","Vip (Dog)","Economy (Cat)","Regular (Cat)","Vip (Cat)"];

  constructor(private router : Router, private loginService : LoginService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  reservationForm(id: number){
    // if(this.loginService.user==undefined){
    //   const modalRef = this.modalService.open(ModalUserDataComponent);
    //   modalRef.result.then((result) => {
    //     console.log(result);
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    //
    // }
    // else{
      const modalRef = this.modalService.open(ModalReservationComponent);
      modalRef.componentInstance.selectedRoomOption=this.options[id];
      modalRef.result.then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    // }
  }

}
