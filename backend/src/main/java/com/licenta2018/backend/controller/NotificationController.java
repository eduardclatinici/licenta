package com.licenta2018.backend.controller;

import com.licenta2018.backend.domain.dto.notification.ClientNotificationsDTO;
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
    public ClientNotificationsDTO getClientNotifications() {
        return taskService.getClientNotifications();
    }

    @PostMapping("/notifications")
    public ResponseEntity markClientNotificationsAsSeen() {
        taskService.markClientNotificationsAsSeen();
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/notifications/{id}")
    public ResponseEntity markNotificationAsSeen(@PathVariable("id") long id) {
        taskService.markNotificationAsSeen(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
