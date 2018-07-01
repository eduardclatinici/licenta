package com.licenta2018.backend.domain.transformer;

import com.licenta2018.backend.domain.dto.reservation.HotelReservationDTO;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

import static com.licenta2018.backend.domain.model.reservation.HotelReservation.Status.PENDING;

@Component
public class HotelReservationTransformer implements Transformer<HotelReservation,HotelReservationDTO>{

    @Override
    public HotelReservation toModel(HotelReservationDTO dto) {
        LocalDate startDate = dto.getStartDate().toLocalDate();
        LocalDate endDate = dto.getEndDate().toLocalDate();
        return  new HotelReservation(startDate, endDate, dto.getRoomType(), dto.getNumberOfGuests(), PENDING);
    }

    @Override
    public HotelReservationDTO toDTO(HotelReservation hotelReservation) {
        return null;
    }
}
