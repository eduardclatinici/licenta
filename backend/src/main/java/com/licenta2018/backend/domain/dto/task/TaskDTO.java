package com.licenta2018.backend.domain.dto.task;

import com.licenta2018.backend.domain.model.reservation.HotelReservation;

import java.time.LocalDateTime;

public class TaskDTO {

    private long id;
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private HotelReservation hotelReservation;
    private String filePath;

    public TaskDTO(long id, String name, LocalDateTime startTime, LocalDateTime endTime, HotelReservation hotelReservation, String filePath) {
        this.id = id;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.hotelReservation = hotelReservation;
        this.filePath = filePath;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public HotelReservation getHotelReservation() {
        return hotelReservation;
    }

    public String getFilePath() {
        return filePath;
    }
}
