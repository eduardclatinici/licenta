package com.licenta2018.backend.domain.dto;

import java.util.List;

public class BookedDaysOfMonth {

    private List<Integer> fullyBookedDays;

    public BookedDaysOfMonth(List<Integer> fullyBookedDays) {
        this.fullyBookedDays = fullyBookedDays;
    }

    public List<Integer> getFullyBookedDays() {
        return fullyBookedDays;
    }

    public void setFullyBookedDays(List<Integer> fullyBookedDays) {
        this.fullyBookedDays = fullyBookedDays;
    }
}
