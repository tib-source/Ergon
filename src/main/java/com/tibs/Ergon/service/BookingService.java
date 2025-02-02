package com.tibs.Ergon.service;
import com.tibs.Ergon.enums.NotificationTypeEnum;
import com.tibs.Ergon.expception.BookingNotFound;
import com.tibs.Ergon.expception.EquipmentNotAvailable;
import com.tibs.Ergon.request.GeneralBookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tibs.Ergon.expception.UserNotFound;
import com.tibs.Ergon.model.Booking;
import com.tibs.Ergon.repository.BookingRepository;
import com.tibs.Ergon.model.Equipment;
import com.tibs.Ergon.model.User;
import com.tibs.Ergon.repository.UserRepository;
import com.tibs.Ergon.request.BookingRequest;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepo; 

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    UserRepository userRepo;

    @Transactional
    public Booking createBooking(BookingRequest request){
        Equipment equipment = equipmentService.findById(request.getEquipmentId());
        User user = userRepo.findById(request.getUserId()).orElseThrow(UserNotFound::new);
        if(equipmentService.isAvailable(equipment)){ 
            Booking newBooking =  Booking.builder()
            .equipment(equipment)
            .booked_from(request.getFrom())
            .booked_to(request.getTo())
            .reason(request.getReason())
            .user(user)
            .returned(false)
            .approved(false)
            .build();

            Booking booking = bookingRepo.save(newBooking);
            equipmentService.linkToBooking(booking, equipment);

            notificationService.createNotification(NotificationTypeEnum.BOOKING_REQUEST, user.getId(), "Booking request created for " + equipment.getName());

            return newBooking;
//            TODO: Create an approval request alongside this
        }else{
            throw new EquipmentNotAvailable();
        }
    }

    public void cancelBooking(GeneralBookingRequest request){
        User user = userRepo.findById(request.getUserId()).orElseThrow(UserNotFound::new);
        Booking currentBooking = bookingRepo.findById(request.getBookingId()).orElseThrow(BookingNotFound::new);
        bookingRepo.delete(currentBooking);
    }

    public void approveBooking(GeneralBookingRequest request){
        Booking booking = bookingRepo.findById(request.getBookingId()).orElseThrow(BookingNotFound::new);
        User user = userRepo.findById(request.getUserId()).orElseThrow(UserNotFound::new);
        // TODO: FINISH THIS FUNCTION
        // TODO: Booking should have approved status and User should be notified
    }

}