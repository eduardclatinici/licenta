package com.licenta2018.backend.domain.dto.reservation;

public class FreeRoomsDto {

    private String roomType;
    private long availableRooms;
    private long totalRooms;

    public FreeRoomsDto(String roomType, long availableRooms, long totalRooms) {
        this.roomType = roomType;
        this.availableRooms = availableRooms;
        this.totalRooms = totalRooms;
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

    public long getTotalRooms() {
        return totalRooms;
    }

    public void setTotalRooms(long totalRooms) {
        this.totalRooms = totalRooms;
    }
}
