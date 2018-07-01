package com.licenta2018.backend.rooms;

import com.google.common.collect.ImmutableMap;
import com.licenta2018.backend.domain.dto.reservation.BookedDaysOfMonth;
import com.licenta2018.backend.domain.dto.reservation.FreeRoomsDto;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import com.licenta2018.backend.domain.repository.HotelReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.time.temporal.TemporalAdjusters.lastDayOfMonth;

@Component
public class HotelRoomsResolver {

    @Autowired
    private HotelReservationRepository hotelReservationRepository;

    private static final Map<String, Long> hotelRooms = ImmutableMap.<String, Long>builder()
            .put("Economy (Dog)", 10L)
            .put("Regular (Dog)", 5L)
            .put("Vip (Dog)", 3L)
            .put("Economy (Cat)", 10L)
            .put("Regular (Cat)", 5L)
            .put("Vip (Cat)", 3L)
            .build();

    public Map<String, Long> getHotelTotalRooms() {
        return hotelRooms;
    }

    public BookedDaysOfMonth getFullyBookedDaysOfMonth(String roomType, int year, int month) {
        LocalDate monthStart = LocalDate.of(year, month, 1);
        LocalDate monthEnd = monthStart.with(lastDayOfMonth());
        List<HotelReservation> hotelReservationsDuringMonth = hotelReservationRepository.findAllReservationsDuringMonth(roomType, monthStart, monthEnd);
        Map<Integer, Long> hotelCapabilities = initMapWithBookedRooms(monthEnd.getDayOfMonth());
        computeHotelCapabilites(hotelCapabilities, hotelReservationsDuringMonth, monthStart, monthEnd);
        return getBookedDaysOfMonth(hotelCapabilities, roomType);
    }

    public List<FreeRoomsDto> getAvailableRoomsTomorrow() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<BookedHotelRooms> bookedHotelRooms = hotelReservationRepository.findBookedRoomsCount(tomorrow);
        return hotelRooms.keySet()
                .stream()
                .map(roomType -> {
                    long totalRoomByType = hotelRooms.get(roomType);
                    return new FreeRoomsDto(roomType, totalRoomByType - getCountOfBookedRoomsByType(roomType, bookedHotelRooms), totalRoomByType);
                })
                .collect(Collectors.toList());
    }

    public String computeRoomNumber(String roomType, LocalDate startDate) {
        String room = "";
        String roomPrefix = getRoomPrefix(roomType);
        List<HotelReservation> hotelReservations = hotelReservationRepository.findReservationsByRoomTypeAndStartDate(roomType, startDate);
        List<String> bookedRoomNumbers = hotelReservations
                .stream()
                .map(HotelReservation::getRoom)
                .collect(Collectors.toList());
        for (long nr = 1; nr <= hotelRooms.get(roomType); ++ nr) {
            String roomNumber = roomPrefix.concat(Long.toString(nr));
            if (!bookedRoomNumbers.contains(roomNumber)) {
                room = roomNumber;
                break;
            }
        }
        return room;
    }

    private long getCountOfBookedRoomsByType(String roomType, List<BookedHotelRooms> bookedHotelRooms) {
        return bookedHotelRooms.stream()
                .filter(room -> roomType.equals(room.getRoomType()))
                .findFirst()
                .map(BookedHotelRooms::getCount)
                .orElse(0L);
    }

    private Map<Integer, Long> initMapWithBookedRooms(int endDay) {
        Map<Integer, Long> rooms = new HashMap<>();
        for (int day = 1; day <= endDay; ++day) {
            rooms.put(day, 0L);
        }
        return rooms;
    }

    private void computeHotelCapabilites(Map<Integer, Long> hotelCapabilities, List<HotelReservation> reservations, LocalDate monthStart, LocalDate monthEnd) {
        reservations
                .forEach(reservation -> {
                    LocalDate start = reservation.getStartDate().isBefore(monthStart) ? monthStart : reservation.getStartDate();
                    LocalDate end = reservation.getEndDate().isAfter(monthEnd) ? monthEnd : reservation.getEndDate();
                    for (LocalDate date = start; !date.isAfter(end); date = date.plusDays(1)) {
                            hotelCapabilities.merge(date.getDayOfMonth(), 1L, Long::sum);
                    }
                });
    }

    private BookedDaysOfMonth getBookedDaysOfMonth(Map<Integer, Long> hotelCapabilities, String roomType) {
        long totalNumberOfRooms = hotelRooms.get(roomType);
        return new BookedDaysOfMonth(
                hotelCapabilities.entrySet()
                .stream()
                .filter(entry -> entry.getValue() == totalNumberOfRooms)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList())
        );
    }

    private String getRoomPrefix(String roomType) {
        switch (roomType) {
            case "Economy (Dog)" :
                return "ED";
            case "Regular (Dog)" :
                return "RD";
            case "Vip (Dog)" :
                return "VD";
            case "Economy (Cat)" :
                return "EC";
            case "Regular (Cat)" :
                return "RC";
            case "Vip (Cat)" :
                return "VC";
            default :
                return "undefined";
        }
    }
}
