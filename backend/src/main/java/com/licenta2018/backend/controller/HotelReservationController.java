package com.licenta2018.backend.controller;

import com.licenta2018.backend.domain.dto.reservation.BookedDaysOfMonth;
import com.licenta2018.backend.domain.dto.reservation.FreeRoomsDto;
import com.licenta2018.backend.domain.dto.reservation.HotelReservationDTO;
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

    @PostMapping("/hotelReservations")
    public ResponseEntity makeReservation(@RequestBody HotelReservationDTO hotelReservationDTO) {
        hotelReservationService.save(hotelReservationTransformer.toModel(hotelReservationDTO));
        return new ResponseEntity(OK);
    }

    @GetMapping("/availableRoomsTomorrow")
    public List<FreeRoomsDto> getAvailableRoomsTomorrow() {
        return hotelReservationService.getAvailableRoomsTomorrow();
    }

    @GetMapping("/fullyBookedDaysOfMonth")
    public BookedDaysOfMonth getfullyBookedDaysOfMonth(@NotNull @RequestParam("roomType") String roomType,
                                                       @NotNull @RequestParam("year") int year,
                                                       @NotNull @RequestParam("month") int month) {
        return hotelReservationService.getFullyBookedDaysOfMonth(roomType, year, month);
    }
}
