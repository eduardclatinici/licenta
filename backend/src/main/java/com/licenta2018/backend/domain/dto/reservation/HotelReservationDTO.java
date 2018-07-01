package com.licenta2018.backend.domain.dto.reservation;

import com.licenta2018.backend.domain.dto.DateDTO;

public class HotelReservationDTO {
    private DateDTO startDate;
    private DateDTO endDate;
    private String roomType;
    private int numberOfGuests;

    public HotelReservationDTO(){}

    public HotelReservationDTO(DateDTO startDate, DateDTO endDate, String roomType, int numberOfGuests) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.roomType = roomType;
        this.numberOfGuests = numberOfGuests;
    }

    public DateDTO getStartDate() {
        return startDate;
    }

    public void setStartDate(DateDTO startDate) {
        this.startDate = startDate;
    }

    public DateDTO getEndDate() {
        return endDate;
    }

    public void setEndDate(DateDTO endDate) {
        this.endDate = endDate;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }
}
