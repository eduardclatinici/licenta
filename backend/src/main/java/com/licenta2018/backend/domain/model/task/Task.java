package com.licenta2018.backend.domain.model.task;

import com.licenta2018.backend.domain.model.reservation.HotelReservation;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

import static com.licenta2018.backend.domain.model.task.Task.Status.UPCOMING;
import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "TASKS")
public class Task {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long id;

    @Column
    @NotNull(message = "Name cannot be null")
    private String name;

    @Column
    @NotNull(message = "Start hour cannot be null (inclusive)")
    private LocalDateTime startHour;

    @Column
    @NotNull(message = "End Hour cannot be null (exclusive)")
    private LocalDateTime endHour;

    @ManyToOne(optional = false)
    @JoinColumn(name = "RESERVATION_ID")
    private HotelReservation hotelReservation;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column
    private String filePath;

    @Column(nullable = false, columnDefinition = "boolean default false")
    @NotNull(message = "seen cannot be null")
    private boolean seen;

    public Task() {}

    public Task(String name, LocalDateTime startHour, LocalDateTime endHour, HotelReservation hotelReservation) {
        this.name = name;
        this.startHour = startHour;
        this.endHour = endHour;
        this.hotelReservation = hotelReservation;
        this.status = UPCOMING;
    }

    public enum Status {
        UPCOMING, FINISHED
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getStartHour() {
        return startHour;
    }

    public LocalDateTime getEndHour() {
        return endHour;
    }

    public HotelReservation getHotelReservation() {
        return hotelReservation;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public boolean isSeen() {
        return seen;
    }

    public void setSeen(boolean seen) {
        this.seen = seen;
    }
}
