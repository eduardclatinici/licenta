package com.licenta2018.backend.rooms;

public class BookedHotelRooms {

    private String roomType;
    private long count;

    public BookedHotelRooms(String roomType, long count) {
        this.roomType = roomType;
        this.count = count;
    }

    public String getRoomType() {
        return roomType;
    }

    public long getCount() {
        return count;
    }
}
