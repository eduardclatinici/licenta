import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {DateRange} from '../../models/dateRange.model';
import {DatePickerService} from '../../services/date-picker.service';
import {map} from 'rxjs/operators';
import {element} from 'protractor';
import {start} from 'repl';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const inside = (one: NgbDateStruct, two: NgbDateStruct, inside: NgbDateStruct) =>
  !one || !two || !inside ? false : inside.year >= one.year && inside.year <= two.year &&
    inside.month >= one.month && inside.month <= two.month &&
    inside.day >= one.day && inside.day <= two.day;

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.css']
})
export class RangeDatePickerComponent implements OnInit, OnChanges {
  dateRange: DateRange = new DateRange();
  @Input() selectedRoomType;

  fullyBookedDaysOfJune: number[] = [8];

  @Input() showDatePicker;

  @Output()
  dateRangeEmitter = new EventEmitter<DateRange>();

  hoveredDate: NgbDateStruct;
  date: Date = new Date();
  minDate = {year: this.date.getUTCFullYear(), month: this.date.getUTCMonth() + 1, day: this.date.getDay()};
  maxDate = {year: this.date.getUTCFullYear() + 1, month: this.date.getUTCMonth() + 1, day: this.date.getDay()};
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  displayMonths: Number;

  constructor(calendar: NgbCalendar, private datePickerService: DatePickerService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.emitRange();
  }

  async ngOnInit() {
    // this.datePickerService.getFullyBookedDaysOfMonth(this.selectedRoomType, 2018, 7).subscribe(resp=>{
    //   this.fullyBookedDaysOfJune = resp;
    //   console.log(this.fullyBookedDaysOfJune);
    // },err=>{
    //   console.log('error')
    // });

    if (window.innerWidth > 576)
      this.displayMonths = 2;
    else
      this.displayMonths = 1;

  };


  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate && !this.isDisabled(date)) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate) &&
      !this.isDisabled(date)) {
      this.toDate = date;
    } else if (!this.isDisabled(date)) {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.disableCondition(this.fullyBookedDaysOfJune, 7)) {
      this.toDate = null;
      this.fromDate = date;
    }
    this.emitRange();
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  emitRange() {
    this.dateRange.startDate = this.fromDate;
    this.dateRange.endDate = this.toDate;
    this.dateRangeEmitter.emit(this.dateRange);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 576)
      this.displayMonths = 2;
    else
      this.displayMonths = 1;
  }

  isDisabled(date: NgbDateStruct) {
    return date.month == 7 && this.fullyBookedDaysOfJune.indexOf(date.day)>=0;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  disableCondition(list: number[], month): boolean {
    let ok: boolean = false;
    for (let element in list) {
      let dateSS = {year: 2018, month: month, day: element};
      if (this.isInside(dateSS)) {
        ok = true;
      }
    }
    return ok;
  }

}
