package com.licenta2018.backend.service;

import com.licenta2018.backend.domain.dto.reservation.BookedDaysOfMonth;
import com.licenta2018.backend.domain.dto.reservation.FreeRoomsDto;
import com.licenta2018.backend.domain.model.reservation.HotelReservation;
import com.licenta2018.backend.domain.repository.HotelReservationRepository;
import com.licenta2018.backend.rooms.HotelRoomsResolver;
import com.licenta2018.backend.service.interfaces.HotelReservationService;
import com.licenta2018.backend.service.interfaces.TaskService;
import com.licenta2018.backend.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelReservationServiceImpl implements HotelReservationService {

    @Autowired
    private HotelReservationRepository hotelReservationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private HotelRoomsResolver hotelRoomsResolver;

    @Autowired
    private TaskService taskService;

    @Override
    public List<FreeRoomsDto> getAvailableRoomsTomorrow() {
        return hotelRoomsResolver.getAvailableRoomsTomorrow();
    }

    @Override
    public BookedDaysOfMonth getFullyBookedDaysOfMonth(String roomType, int year, int month) {
        return hotelRoomsResolver.getFullyBookedDaysOfMonth(roomType, year, month);
    }

    @Override
    public void save(HotelReservation entity) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        entity.setUser(userService.getByEmail(email));
        hotelReservationRepository.save(entity);
        taskService.createTasksForHotelReservation(entity);
    }

    @Override
    public List<HotelReservation> getAll() {
        return hotelReservationRepository.findAll();
    }

    @Override
    public List<HotelReservation> getAll(int pageSize, int pageNumber) {
        return hotelReservationRepository.findAll(new PageRequest(pageNumber,pageSize)).getContent();
    }

    @Override
    public HotelReservation getById(Long id) {
        return hotelReservationRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        hotelReservationRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        hotelReservationRepository.deleteAll();
    }
}
