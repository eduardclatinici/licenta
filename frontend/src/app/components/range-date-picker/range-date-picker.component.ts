import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {DateRange} from '../../models/dateRange.model';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
!one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
  ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.css']
})
export class RangeDatePickerComponent implements OnInit {
  dateRange : DateRange = new DateRange();
  @Output()
    dateRangeEmitter = new EventEmitter<DateRange>();

  hoveredDate: NgbDateStruct;
  date : Date = new Date();
  minDate = {year: this.date.getUTCFullYear(), month: 1, day: 1};
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    displayMonths : Number;

    constructor(calendar: NgbCalendar) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
      this.emitRange();
    }

  ngOnInit() {
      if(window.innerWidth>576)
        this.displayMonths = 2;
      else
        this.displayMonths = 1;
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.emitRange();
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  emitRange(){
    this.dateRange.startDate = this.fromDate;
    this.dateRange.endDate = this.toDate;
    this.dateRangeEmitter.emit(this.dateRange);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth>576)
      this.displayMonths = 2;
    else
      this.displayMonths = 1;
  }
}
