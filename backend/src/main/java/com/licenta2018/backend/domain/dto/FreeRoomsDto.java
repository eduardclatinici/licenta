package com.licenta2018.backend.domain.dto;

public class FreeRoomsDto {

    private String roomType;
    private int availableRooms;

    public FreeRoomsDto(String roomType, int availableRooms) {
        this.roomType = roomType;
        this.availableRooms = availableRooms;
    }
}
