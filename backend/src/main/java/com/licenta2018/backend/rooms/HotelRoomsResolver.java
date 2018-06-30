package com.licenta2018.backend.rooms;

import com.google.common.collect.ImmutableMap;
import com.licenta2018.backend.domain.dto.FreeRoomsDto;
import com.licenta2018.backend.domain.repository.HotelReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class HotelRoomsResolver {

    @Autowired
    private HotelReservationRepository hotelReservationRepository;

    private static final Map<String, Integer> hotelRooms = ImmutableMap.<String, Integer>builder()
            .put("Economy (Dog)", 10)
            .put("Regular (Dog)", 5)
            .put("VIP (Dog)", 3)
            .put("Economy (Cat)", 10)
            .put("Regular (Cat)", 5)
            .put("VIP (Cat)", 3)
            .build();

    public Map<String, Integer>  getHotelTotalRooms() {
        return hotelRooms;
    }

    public List<FreeRoomsDto> getAvailableRoomsToday() {
        List<BookedHotelRooms> bookedHotelRooms = hotelReservationRepository.findBookedRoomsCount();
        return null;

    }

    private int getCountOfBookedRoomsByType(String roomType, List<BookedHotelRooms> bookedHotelRooms) {
        return bookedHotelRooms.stream()
                .filter(room -> roomType.equals(room.getRoomType()))
                .findFirst()
                .map(BookedHotelRooms::getCount)
                .orElse(0);
    }
}
