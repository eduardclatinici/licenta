package com.licenta2018.backend.domain.dto.task;

import java.util.List;

public class AvailableTasksDTO {

    private List<TaskDTO> availableTasks;

    public AvailableTasksDTO(List<TaskDTO> availableTasks) {
        this.availableTasks = availableTasks;
    }

    public List<TaskDTO> getAvailableTasks() {
        return availableTasks;
    }
}
