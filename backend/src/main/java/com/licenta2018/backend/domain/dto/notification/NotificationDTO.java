package com.licenta2018.backend.domain.dto.notification;

import java.time.LocalDateTime;

public class NotificationDTO {

    private long id;
    private String name;
    private LocalDateTime endHour;
    private String filePath;

    public NotificationDTO(long id, String name, LocalDateTime endHour, String filePath) {
        this.id = id;
        this.name = name;
        this.endHour = endHour;
        this.filePath = filePath;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getEndHour() {
        return endHour;
    }

    public String getFilePath() {
        return filePath;
    }

}
