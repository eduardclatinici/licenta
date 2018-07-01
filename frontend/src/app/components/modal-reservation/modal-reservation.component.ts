import { Component, OnInit, Input} from '@angular/core';
import {$} from 'jquery';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DateRange} from '../../models/dateRange.model';
import {HotelReservationModel} from '../../models/hotelReservation.model';
import {ReservationService} from '../../services/reservation.service';


@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.css']
})
export class ModalReservationComponent implements OnInit {

  reservationModel : HotelReservationModel = new HotelReservationModel();

  @Input() selectedRoomType : String;
  private roomTypes = ["Economy (Dog)","Regular (Dog)","Vip (Dog)","Economy (Cat)","Regular (Cat)","Vip (Cat)"];

  selectedNumberOfGuests : number = 1;
  private guestOptions = [1,2,3,4];

  private startDate : NgbDateStruct;
  private endDate : NgbDateStruct;

  ngOnInit() {
  }

  myForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private reservationService : ReservationService,
  ) {
      this.createForm();
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      roomType: '',
      startDate: '',
      endDate: '',
      numberOfGuests: ''
    });
  }
  private submitForm() {
    this.reservationModel.roomType = this.selectedRoomType;
    this.reservationModel.numberOfGuests = this.selectedNumberOfGuests;
    this.reservationModel.startDate = this.startDate;
    this.reservationModel.endDate = this.endDate;

    this.reservationService.createReservation(this.reservationModel).subscribe(response => {
      this.activeModal.close();
    },
    err => {
      console.log("eroare in crearea rezervarii")
    });

    this.activeModal.close(this.myForm.value);
  }

  private getOtherOptions(){
    return this.roomTypes.filter(x => x != this.selectedRoomType)
  }

  private getOtherGuestOptions(){
    return this.guestOptions.filter(x => x != this.selectedNumberOfGuests)
  }

  dateRangeListener(dateRangeEmitter : DateRange) {
    this.startDate = dateRangeEmitter.startDate;
    this.endDate = dateRangeEmitter.endDate;
  }
}
