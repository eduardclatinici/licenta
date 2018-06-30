package com.licenta2018.backend.domain.repository;

import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import com.licenta2018.backend.rooms.BookedHotelRooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface HotelReservationRepository extends JpaRepository<HotelReservation, Long> {

    @Query("SELECT new com.licenta2018.backend.rooms.BookedHotelRooms(r.roomType, count(r)) " +
           "FROM HotelReservation r WHERE r.status = \'ACTIVE\' AND r.startDate = CURRENT_DATE " +
           "GROUP BY r.roomType")
    List<BookedHotelRooms> findBookedRoomsCount();

    @Query("SELECT r FROM HotelReservation r WHERE " +
           "(r.startDate >= ?1 AND r.startDate <= ?2) OR " +
           "(r.endDate >= ?1 AND r.endDate <= ?2)")
    List<HotelReservation> findAllReservationsDuringMonth(LocalDate monthStart, LocalDate monthEnd);
}
