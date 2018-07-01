package com.licenta2018.backend.service.interfaces;

import com.licenta2018.backend.domain.dto.task.AvailableTasksDTO;
import com.licenta2018.backend.domain.dto.task.TaskDTO;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import com.licenta2018.backend.domain.model.task.Task;
import org.springframework.web.multipart.MultipartFile;

public interface TaskService extends CrudService<Task> {

    void createTasksForHotelReservation(HotelReservation hotelReservation);

    AvailableTasksDTO getAvailableTasks();

    TaskDTO processTask(long id, MultipartFile file);
}
