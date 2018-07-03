package com.licenta2018.backend.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import com.licenta2018.backend.domain.dto.notification.ClientNotificationsDTO;
import com.licenta2018.backend.domain.dto.notification.NotificationDTO;
import com.licenta2018.backend.service.interfaces.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/notifications")
    public List<NotificationDTO> getClientNotifications() {
        return taskService.getClientNotifications().getNotifications();
    }

    @PostMapping("/notifications")
    public ResponseEntity markClientNotificationsAsSeen() {
        taskService.markClientNotificationsAsSeen();
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/notifications/{id}")
    public List<NotificationDTO> markNotificationAsSeen(@PathVariable("id") long id) {
        taskService.markNotificationAsSeen(id);
        return taskService.getClientNotifications().getNotifications();
    }
}
