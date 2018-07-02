package com.licenta2018.backend.domain.dto.notification;

import java.util.List;

public class ClientNotificationsDTO {

    private List<NotificationDTO> notifications;

    public ClientNotificationsDTO(List<NotificationDTO> notifications) {
        this.notifications = notifications;
    }

    public List<NotificationDTO> getNotifications() {
        return notifications;
    }
}
