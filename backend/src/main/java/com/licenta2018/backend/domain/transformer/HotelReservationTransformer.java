package com.licenta2018.backend.domain.transformer;

import org.springframework.stereotype.Component;

import com.licenta2018.backend.domain.dto.HotelReservationDTO;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;

@Component
public class HotelReservationTransformer implements Transformer<HotelReservation,HotelReservationDTO>{

    @Override
    public HotelReservation toModel(HotelReservationDTO dto) {
        HotelReservation reservation = new HotelReservation();
//        reservation.setStartDate(dto.getStartDate());
return null;
    }

    @Override
    public HotelReservationDTO toDTO(HotelReservation hotelReservation) {
        return null;
    }
}
