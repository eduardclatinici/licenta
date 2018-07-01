package com.licenta2018.backend.domain.model.reservation;

import com.licenta2018.backend.domain.model.user.User;

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
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity
@Table(name = "HOTEL_RESERVATIONS")
public class HotelReservation {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long id;

    @Column
    @NotNull(message = "Start date cannot be null (inclusive)")
    private LocalDate startDate;

    @Column
    @NotNull(message = "End date cannot be null (exclusive)")
    private LocalDate endDate;

    @Column
    @NotNull(message = "Room type cannot be null")
    private String roomType;

    @Column
    @NotNull(message = "Number of guests cannot be null")
    @Min(value = 1, message = "Guests number must be at least 1")
    @Max(value = 4, message = "Guests number must be at most 4")
    private int numberOfGuests;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "CLIENT_ID")
    private User user;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    public HotelReservation() {}

    public HotelReservation(LocalDate startDate, LocalDate endDate, String roomType, int numberOfGuests, Status status) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.roomType = roomType;
        this.numberOfGuests = numberOfGuests;
        this.status = status;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public enum Status {
        PENDING, ACTIVE, COMPLETED
    }
}
