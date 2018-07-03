package com.licenta2018.backend.controller;

import static org.springframework.http.MediaType.*;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.licenta2018.backend.domain.dto.notification.NotificationDTO;
import com.licenta2018.backend.service.FileStorageService;
import com.licenta2018.backend.service.interfaces.TaskService;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private FileStorageService fileService;

    @GetMapping("/notifications")
    public List<NotificationDTO> getClientNotifications() {
        return taskService.getClientNotifications().getNotifications();
    }

    @PostMapping("/notifications")
    public ResponseEntity markClientNotificationsAsSeen() {
        taskService.markClientNotificationsAsSeen();
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/image/{id}/{name}", produces = IMAGE_JPEG_VALUE)
    public String getFile(@PathVariable("id") int notificationId, @PathVariable("name") String name) throws IOException {
        return fileService.getFile(notificationId, name);
    }

    @PostMapping("/notifications/{id}")
    public List<NotificationDTO> markNotificationAsSeen(@PathVariable("id") long id) {
        taskService.markNotificationAsSeen(id);
        return taskService.getClientNotifications().getNotifications();
    }
}
