import { Component, OnInit, Input} from '@angular/core';
import {$} from 'jquery';
import {NgbActiveModal, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DateRange} from '../../models/dateRange.model';


@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.css']
})
export class ModalReservationComponent implements OnInit {

  @Input() selectedRoomOption : String;
  private roomOptions = ["Economy (Dog)","Regular (Dog)","Vip (Dog)","Economy (Cat)","Regular (Cat)","Vip (Cat)"];

  selectedGuestOption : Number = 1;
  private guestOptions = [1,2,3,4];

  private startDate : NgbDateStruct;
  private endDate : NgbDateStruct;

  ngOnInit() {
  }

  myForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
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
    this.myForm.controls['roomType'].setValue(this.selectedRoomOption);
    this.myForm.controls['numberOfGuests'].setValue(this.selectedGuestOption);
    this.myForm.controls['startDate'].setValue(this.startDate);
    this.myForm.controls['endDate'].setValue(this.endDate);

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
