package com.licenta2018.backend.domain.model.reservation;

import static javax.persistence.GenerationType.*;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;


import com.licenta2018.backend.domain.model.enumeration.RoomType;

@Entity
@Table(name = "ROOM_RESERVATIONS")
public class RoomReservation {
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
    private RoomType roomType;

    @Column
    @NotNull(message = "Number of guests cannot be null")
    @Min(value = 1,message = "Guests number must be at least 1")
    @Max(value = 4,message = "Guests number must be at most 4")
    private int numberOfGuests;

}
