package com.licenta2018.backend.domain.dto;

public class FreeRoomsDto {

    private String roomType;
    private long availableRooms;

    public FreeRoomsDto(String roomType, long availableRooms) {
        this.roomType = roomType;
        this.availableRooms = availableRooms;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public long getAvailableRooms() {
        return availableRooms;
    }

    public void setAvailableRooms(long availableRooms) {
        this.availableRooms = availableRooms;
    }
}
