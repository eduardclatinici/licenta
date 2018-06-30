package com.licenta2018.backend.service.interfaces;

import com.licenta2018.backend.domain.dto.FreeRoomsDto;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;

import java.util.List;

public interface HotelReservationService extends CrudService<HotelReservation> {

    List<FreeRoomsDto> getAvailableRoomsToday();
}
