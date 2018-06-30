package com.licenta2018.backend.domain.model.reservation;

import static javax.persistence.GenerationType.*;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.licenta2018.backend.domain.model.user.User;

@Entity
@Table(name = "HOTEL_RESERVATIONS")
public class HotelReservation {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long id;

    @Column
    @NotNull(message = "Start date cannot be null (inclusive)")
    private Date startDate;

    @Column
    @NotNull(message = "End date cannot be null (exclusive)")
    private Date endDate;

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

    public HotelReservation() {
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }
}
