package com.licenta2018.backend.controller;

import com.licenta2018.backend.domain.dto.notification.ClientNotificationsDTO;
import com.licenta2018.backend.service.interfaces.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/notifications")
    public ClientNotificationsDTO getClientNotifications() {
        return taskService.getClientNotifications();
    }
}
