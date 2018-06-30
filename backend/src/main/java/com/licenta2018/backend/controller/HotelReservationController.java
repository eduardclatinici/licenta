package com.licenta2018.backend.controller;

import com.licenta2018.backend.domain.dto.BookedDaysOfMonth;
import com.licenta2018.backend.domain.dto.FreeRoomsDto;
import com.licenta2018.backend.domain.dto.HotelReservationDTO;
import com.licenta2018.backend.domain.transformer.HotelReservationTransformer;
import com.licenta2018.backend.service.interfaces.HotelReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotNull;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api")
public class HotelReservationController {

    @Autowired
    private HotelReservationService hotelReservationService;

    @Autowired
    private HotelReservationTransformer hotelReservationTransformer;

    @PostMapping("/hotelReservation")
    public ResponseEntity makeReservation(@RequestBody HotelReservationDTO hotelReservationDTO) {
        hotelReservationService.save(hotelReservationTransformer.toModel(hotelReservationDTO));
        return new ResponseEntity(OK);
    }

    @GetMapping("/availableRoomsToday")
    public List<FreeRoomsDto> getAvailableRoomsToday() {
        return hotelReservationService.getAvailableRoomsToday();
    }

    @GetMapping("/fullyBookedDaysOfMonth")
    public BookedDaysOfMonth getfullyBookedDaysOfMonth(@NotNull @RequestParam("month") int month) {
        return hotelReservationService.getFullyBookedDaysOfMonth(month);
    }
}
