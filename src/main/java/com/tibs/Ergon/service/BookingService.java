package com.tibs.Ergon.service;

import com.tibs.Ergon.enums.NotificationTypeEnum;
import com.tibs.Ergon.expception.BookingNotFound;
import com.tibs.Ergon.expception.EquipmentNotAvailable;
import com.tibs.Ergon.expception.UserNotFound;
import com.tibs.Ergon.model.Booking;
import com.tibs.Ergon.model.Equipment;
import com.tibs.Ergon.model.User;
import com.tibs.Ergon.repository.BookingRepository;
import com.tibs.Ergon.repository.UserRepository;
import com.tibs.Ergon.request.BookingRequest;
import com.tibs.Ergon.request.GeneralBookingRequest;
import com.tibs.Ergon.util.UserUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class BookingService {
    public static final Logger log = LoggerFactory.getLogger(BookingService.class);

    @Autowired
    BookingRepository bookingRepo;

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    UserRepository userRepo;

    @Transactional
    public Booking createBooking(BookingRequest request) {
        log.info("Incoming Booking request {}", request.toString());
        Equipment equipment = equipmentService.findById(request.getEquipmentId());
        String authorizedUser = UserUtil.userName();
        User user = userRepo.findByUsername(authorizedUser).orElseThrow(UserNotFound::new);
        this.validateBookingRequest(request);
        if (equipmentService.isAvailable(equipment)) {
            Booking newBooking = Booking.builder()
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

            notificationService.createNotification(NotificationTypeEnum.REQUEST_CREATED, user.getId(), "Booking request created for " + equipment.getName());

            return newBooking;
//            TODO: Create an approval request alongside this
        } else {
            throw new EquipmentNotAvailable();
        }
    }

    public void cancelBooking(Booking booking) {
        bookingRepo.delete(booking);
        notificationService.createNotification(NotificationTypeEnum.REQUEST_CREATED, booking.getUser().getId(), "Booking request cancelled for " + booking.getEquipment().getName());

    }

    public void approveBooking(GeneralBookingRequest request) {
        Booking booking = bookingRepo.findById(request.getBookingId()).orElseThrow(BookingNotFound::new);
        User user = userRepo.findById(request.getUserId()).orElseThrow(UserNotFound::new);
        // TODO: FINISH THIS FUNCTION
        // TODO: Booking should have approved status and User should be notified
    }


    private void validateBookingRequest(BookingRequest request) {
        if (request.getTo().isBefore(LocalDate.now()) || request.getFrom().isAfter(request.getTo()) || request.getFrom().isEqual(request.getTo())) {
            throw new RuntimeException("Invalid dates provided");
        }
    }

    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id).orElseThrow(BookingNotFound::new);
    }

}