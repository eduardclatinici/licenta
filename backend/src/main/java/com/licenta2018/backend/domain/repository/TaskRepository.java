package com.licenta2018.backend.domain.repository;

import com.licenta2018.backend.domain.model.task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.status = \'UPCOMING\' AND " +
           "t.startHour > ?1 AND t.endHour < ?2 " +
           "ORDER BY t.startHour ASC")
    List<Task> findAvailableTasks(LocalDateTime startDay, LocalDateTime endDay);

    @Query("SELECT t FROM Task t WHERE " +
           "t.hotelReservation.user.email = ?1 " +
           "ORDER BY t.startHour DESC")
    List<Task> findTasksForUser(String user);
}
