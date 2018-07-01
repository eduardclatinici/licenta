package com.licenta2018.backend.controller;

import com.licenta2018.backend.domain.dto.task.AvailableTasksDTO;
import com.licenta2018.backend.domain.dto.task.TaskDTO;
import com.licenta2018.backend.service.interfaces.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public AvailableTasksDTO getAvailableTask() {
        return taskService.getAvailableTasks();
    }

    @PostMapping("/tasks/{id}")
    public TaskDTO processTask(@PathVariable("id") long id,
                               @RequestParam("file") MultipartFile file) {
        return taskService.processTask(id, file);
    }
}
