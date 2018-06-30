import { Component, OnInit, Input} from '@angular/core';
import {$} from 'jquery';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DateRange} from '../../models/dateRange.model';
import {HotelReservationModel} from '../../models/hotelReservation.model';
import {ReservationService} from '../../services/reservation.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.css']
})
export class ModalReservationComponent implements OnInit {

  reservationModel : HotelReservationModel = new HotelReservationModel();

  @Input() selectedRoomOption : String;
  private roomOptions = ["Economy (Dog)","Regular (Dog)","Vip (Dog)","Economy (Cat)","Regular (Cat)","Vip (Cat)"];

  selectedGuestOption : number = 1;
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
    private toastr : ToastrService
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
    this.reservationModel.roomOption = this.selectedRoomOption;
    this.reservationModel.guestsNumber = this.selectedGuestOption;
    this.reservationModel.startDate = this.startDate;
    this.reservationModel.endDate = this.endDate;

    this.reservationService.createReservation(this.reservationModel).subscribe(response => {
      this.activeModal.close();
      this.toastr.success('Rezervarea a fost creata', 'Succes');
    },
    err => {
      this.toastr.error('Va rugam incercati mai tarziu', 'Eroare');
    });

    this.activeModal.close(this.myForm.value);
  }

  private getOtherOptions(){
    return this.roomOptions.filter(x => x != this.selectedRoomOption)
  }

  private getOtherGuestOptions(){
    return this.guestOptions.filter(x => x != this.selectedGuestOption)
  }

  dateRangeListener(dateRangeEmitter : DateRange) {
    this.startDate = dateRangeEmitter.startDate;
    this.endDate = dateRangeEmitter.endDate;
  }
}
