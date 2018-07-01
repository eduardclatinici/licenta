package com.licenta2018.backend.domain.transformer;

import com.licenta2018.backend.domain.dto.notification.NotificationDTO;
import com.licenta2018.backend.domain.model.task.Task;
import org.springframework.stereotype.Component;

@Component
public class NotificationTransformer {

    public NotificationDTO fromTask(Task task) {
        return new NotificationDTO(task.getId(), task.getName(), task.getEndHour(), task.getFilePath());
    }
}
