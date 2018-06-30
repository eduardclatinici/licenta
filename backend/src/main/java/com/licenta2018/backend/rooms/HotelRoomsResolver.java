package com.licenta2018.backend.rooms;

import com.google.common.collect.ImmutableMap;
import com.licenta2018.backend.domain.dto.BookedDaysOfMonth;
import com.licenta2018.backend.domain.dto.FreeRoomsDto;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import com.licenta2018.backend.domain.repository.HotelReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.time.temporal.TemporalAdjusters.firstDayOfMonth;
import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

@Component
public class HotelRoomsResolver {

    @Autowired
    private HotelReservationRepository hotelReservationRepository;

    private static final Map<String, Long> hotelRooms = ImmutableMap.<String, Long>builder()
            .put("Economy (Dog)", 10L)
            .put("Regular (Dog)", 5L)
            .put("VIP (Dog)", 3L)
            .put("Economy (Cat)", 10L)
            .put("Regular (Cat)", 5L)
            .put("VIP (Cat)", 3L)
            .build();

    public Map<String, Long> getHotelTotalRooms() {
        return hotelRooms;
    }

    public BookedDaysOfMonth getFullyBookedDaysOfMonth(int month) {
        LocalDate now = LocalDate.now();
        LocalDate monthStart = now.with(firstDayOfMonth());
        LocalDate monthEnd = now.with(lastDayOfMonth());
        List<HotelReservation> hotelReservationsDuringMonth = hotelReservationRepository.findAllReservationsDuringMonth(monthStart, monthEnd);
        return null;
    }

    public List<FreeRoomsDto> getAvailableRoomsToday() {
        List<BookedHotelRooms> bookedHotelRooms = hotelReservationRepository.findBookedRoomsCount();
        return hotelRooms.keySet()
                .stream()
                .map(roomType -> {
                    long totalRoomByType = hotelRooms.get(roomType);
                    return new FreeRoomsDto(roomType, totalRoomByType - getCountOfBookedRoomsByType(roomType, bookedHotelRooms), totalRoomByType);
                })
                .collect(Collectors.toList());
    }

    private long getCountOfBookedRoomsByType(String roomType, List<BookedHotelRooms> bookedHotelRooms) {
        return bookedHotelRooms.stream()
                .filter(room -> roomType.equals(room.getRoomType()))
                .findFirst()
                .map(BookedHotelRooms::getCount)
                .orElse(0L);
    }
}
