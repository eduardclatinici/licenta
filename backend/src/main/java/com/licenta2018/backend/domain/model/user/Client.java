package com.licenta2018.backend.domain.model.user;


import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;

import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.licenta2018.backend.domain.model.reservation.DaycareSubscription;
import com.licenta2018.backend.domain.model.reservation.RoomReservation;
import com.licenta2018.backend.domain.model.reservation.TrainingSubscription;

@Entity
@Table(name = "CLIENTS")
public class Client extends AppUser {

//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinTable(name = "DAYCARE_SUBSCRIPTIONS", joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
//    inverseJoinColumns = @JoinColumn (name = "daycare_subscription_id", referencedColumnName = "id"))
//    private DaycareSubscription daycareSubscription;
//
//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "TRAINING_SUBSCRIPTIONS", joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn (name = "training_subscription_id", referencedColumnName = "id"))
//    private Set<TrainingSubscription> trainingSubscriptions;
//
//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "ROOM_RESERVATIONS", joinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn (name = "room_reservation_id", referencedColumnName = "id"))
//    private Set<RoomReservation> roomReservations;
}
