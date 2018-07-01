package com.licenta2018.backend.controller;

import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @PostMapping("/hotel-reservation")
    public HotelReservation createReservation (){return null;}
}
