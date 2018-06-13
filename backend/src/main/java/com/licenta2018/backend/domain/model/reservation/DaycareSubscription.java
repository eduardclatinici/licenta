package com.licenta2018.backend.domain.model.reservation;

import static javax.persistence.GenerationType.*;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.licenta2018.backend.domain.model.enumeration.DaycarePeriod;

@Entity
@Table(name = "DAYCARE_SUBSCRIPTIONS")
public class DaycareSubscription {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long id;

    @Column
    @NotNull(message = "Daycare period cannot be null")
    private DaycarePeriod daycarePeriod;

    @Column
    @NotNull(message = "Number of guests cannot be null")
    @Min(value = 1, message = "Daycare guests number must be at least 1")
    @Max(value = 10, message = "Daycare guests must be at most 10")
    private int numberOfDaycareGuests;

    @Column
    @NotNull(message = "Start date cannot be null")
    private Date startDate;

}
