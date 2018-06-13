package com.licenta2018.backend.domain.model.reservation;

import static javax.persistence.GenerationType.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.licenta2018.backend.domain.model.enumeration.TrainingType;

@Entity
@Table(name = "TRAINING_SUBSCRIPTIONS")
public class TrainingSubscription {
    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private long id;

    @Column
    @NotNull(message = "Training type cannot be null")
    private TrainingType trainingType;

    @Column
    @NotNull(message = "Number of sessions cannot be null")
    @Min(value = 1, message = "Number of sessions must be at least 1")
    @Max(value = 15, message = "Number of sessions must be at most 15")
    private int remainingSessions;
}
