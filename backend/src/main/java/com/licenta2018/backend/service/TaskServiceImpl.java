package com.licenta2018.backend.service;

import com.licenta2018.backend.domain.dto.task.AvailableTasksDTO;
import com.licenta2018.backend.domain.dto.task.TaskDTO;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import com.licenta2018.backend.domain.model.task.Task;
import com.licenta2018.backend.domain.repository.TaskRepository;
import com.licenta2018.backend.domain.transformer.TaskTransformer;
import com.licenta2018.backend.service.interfaces.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.licenta2018.backend.domain.model.task.Task.Status.FINISHED;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskTransformer taskTransformer;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public void createTasksForHotelReservation(HotelReservation hotelReservation) {
        LocalDate startDate = hotelReservation.getStartDate();
        LocalDate endDate = hotelReservation.getEndDate();
        for (LocalDate date = startDate; date.isBefore(endDate); date = date.plusDays(1)) {
            createTasks(hotelReservation, date);
        }
    }

    @Override
    public AvailableTasksDTO getAvailableTasks() {
        LocalDateTime startDay = LocalDateTime.now().withHour(0).withMinute(0);
        LocalDateTime endDay = LocalDateTime.now().withHour(23). withMinute(59);
        return new AvailableTasksDTO(
                taskRepository.findAvailableTasks(startDay, endDay)
                        .stream()
                        .map(task -> taskTransformer.toDTO(task))
                        .collect(Collectors.toList())
        );
    }

    @Override
    public TaskDTO processTask(long id, MultipartFile file) {
        Task task = getById(id);
        String filePath = fileStorageService.storeFile(id, file);
        setTaskFinished(task, filePath);
        return taskTransformer.toDTO(task);
    }

    @Override
    public void save(Task entity) {
        taskRepository.save(entity);
    }

    @Override
    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> getAll(int pageSize, int pageNumber) {
        return taskRepository.findAll(new PageRequest(pageNumber,pageSize)).getContent();
    }

    @Override
    public Task getById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        taskRepository.deleteAll();
    }

    private void createTasks(HotelReservation hotelReservation, LocalDate day) {
        createFoodTasks(hotelReservation, day);
        createWalkTasks(hotelReservation, day);
    }

    private void createFoodTasks(HotelReservation hotelReservation, LocalDate day) {
        LocalDateTime startTime = LocalDateTime.of(day, LocalTime.of(8, 0));
        save(new Task("Feeding time", startTime, startTime.plusHours(1), hotelReservation));
        save(new Task("Feeding time", startTime.plusHours(5), startTime.plusHours(6), hotelReservation));
        save(new Task("Feeding time", startTime.plusHours(9), startTime.plusHours(10), hotelReservation));
    }

    private void createWalkTasks(HotelReservation hotelReservation, LocalDate day) {
        LocalDateTime startTime = LocalDateTime.of(day, LocalTime.of(10, 0));
        save(new Task("Playing time", startTime, startTime.plusHours(2), hotelReservation));
        save(new Task("Playing time", startTime.plusHours(4), startTime.plusHours(6), hotelReservation));
        save(new Task("Playing time", startTime.plusHours(8), startTime.plusHours(10), hotelReservation));
    }

    private void setTaskFinished(Task task, String filePath) {
        task.setStatus(FINISHED);
        task.setFilePath(filePath);
        taskRepository.save(task);
    }
}
