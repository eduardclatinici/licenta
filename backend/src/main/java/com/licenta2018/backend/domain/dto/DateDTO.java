package com.licenta2018.backend.domain.dto;

import java.time.LocalDate;

public class DateDTO {

    private int year;
    private int month;
    private int day;

    public DateDTO() {}

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public LocalDate toLocalDate() {
        return LocalDate.of(year, month, day);
    }
}
