package com.tibs.Ergon.service;
import com.tibs.Ergon.expception.BookingNotFound;
import com.tibs.Ergon.expception.EquipmentNotAvailable;
import com.tibs.Ergon.request.GeneralBookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tibs.Ergon.expception.EquipmentNotFound;
import com.tibs.Ergon.expception.UserNotFound;
import com.tibs.Ergon.model.Booking;
import com.tibs.Ergon.repository.BookingRepository;
import com.tibs.Ergon.model.Equipment;
import com.tibs.Ergon.repository.EquipmentRepository;
import com.tibs.Ergon.model.User;
import com.tibs.Ergon.repository.UserRepository;
import com.tibs.Ergon.request.BookingRequest;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepo; 

    @Autowired
    EquipmentRepository equipmentRepo;

    @Autowired
    UserRepository userRepo;


    public boolean createBooking(BookingRequest request){
        Equipment equipment = equipmentRepo.findById(request.getEquipmentId()).orElseThrow(EquipmentNotFound::new);
        User user = userRepo.findById(request.getUserId()).orElseThrow(UserNotFound::new);
        if(isEquipmentAvailable(equipment)){ 
            Booking newBooking =  Booking.builder()
            .equipment(equipment)
            .booked_from(request.getFrom())
            .booked_to(request.getTo())
            .reason(request.getReason())
            .user(user)
            .returned(false)
            .approved(false)
            .build();
            bookingRepo.save(newBooking);
            return true;
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
    }
    public boolean isEquipmentAvailable(Equipment equipment){
        if (equipment.getBooking() != null){
            return equipment.getStatus().equals("Available");
        }
        return false;
    }


}