package com.licenta2018.backend.domain.transformer;

import com.licenta2018.backend.domain.dto.task.TaskDTO;
import com.licenta2018.backend.domain.model.task.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskTransformer implements Transformer<Task, TaskDTO> {

    @Override
    public Task toModel(TaskDTO taskDTO) {
        return null;
    }

    @Override
    public TaskDTO toDTO(Task task) {
        return new TaskDTO(task.getId(), task.getName(), task.getStartHour(), task.getEndHour(), task.getHotelReservation(), task.getFilePath(), task.getHotelReservation().getRoom());
    }
}
