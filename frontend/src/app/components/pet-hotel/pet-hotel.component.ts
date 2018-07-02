import {Component, OnInit} from '@angular/core';
import 'bootstrap';
import {ModalReservationComponent} from '../modal-reservation/modal-reservation.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {ModalUserDataComponent} from '../modal-user-data/modal-user-data.component';
import {LocalStorageService} from '../../services/local-storage.service';
import {AvailableRoomsTomorrowModel} from '../../models/availableRoomsTomorrowModel';
import {ReservationService} from '../../services/reservation.service';
import {DatePickerService} from '../../services/date-picker.service';

@Component({
  selector: 'app-pet-hotel',
  templateUrl: './pet-hotel.component.html',
  styleUrls: ['./pet-hotel.component.css']
})
export class PetHotelComponent implements OnInit {
  availableRoomsTomorrow : AvailableRoomsTomorrowModel[];
  options = ['Economy (Dog)', 'Regular (Dog)', 'Vip (Dog)', 'Economy (Cat)', 'Regular (Cat)', 'Vip (Cat)'];

  constructor(private router: Router,
              private modalService: NgbModal,
              private reservationService : ReservationService
  ) {}

  ngOnInit() {
    this.callAvailableRooms();
  }

  callAvailableRooms(){
    this.reservationService.getAvailableRoomsTomorrow().subscribe(response =>{
        this.availableRoomsTomorrow = response.body;
      },
      error =>{

      })
  }

  reservationForm(id: number) {
    if (!LocalStorageService.getAuthorizationToken()) {
      this.modalService.open(ModalUserDataComponent);
    }
    else {
      const modalRef = this.modalService.open(ModalReservationComponent);
      modalRef.componentInstance.selectedRoomType = this.options[id];
      modalRef.result.then((result)=>{
        if(result == 'success')
          this.callAvailableRooms();
      }).catch((error) => {
        console.log(error);
      });
    }
  }


  getNumberOfRoomsByType(typeIndex : number) {
    if(this.availableRoomsTomorrow!=undefined)
      return this.availableRoomsTomorrow.filter((room)=> room.roomType==this.options[typeIndex]).map((room) => room.availableRooms+'/'+room.totalRooms);
    return null;
  }
}
