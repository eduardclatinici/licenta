package com.licenta2018.backend.rooms;

public class BookedHotelRooms {

    private String roomType;
    private int count;

    public BookedHotelRooms(String roomType, int count) {
        this.roomType = roomType;
        this.count = count;
    }

    public String getRoomType() {
        return roomType;
    }

    public int getCount() {
        return count;
    }
}
