package com.tibs.Ergon.mapper;
import com.tibs.Ergon.dto.BookingResponseDTO;
import com.tibs.Ergon.model.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    public BookingResponseDTO toDTO(Booking booking) {
        if (booking == null) {
            return null;
        }

        return BookingResponseDTO.builder()
                .id(booking.getId())
                .bookedFrom(booking.getBooked_from())
                .bookedTo(booking.getBooked_to())
                .status(booking.getStatus())
                .reason(booking.getReason())
                .userId(booking.getUser() != null ? booking.getUser().getId() : null)
                .userName(booking.getUser() != null ? booking.getUser().getUsername() : null)
                .approverId(booking.getApprover() != null ? booking.getApprover().getId() : null)
                .approverName(booking.getApprover() != null ? booking.getApprover().getUsername() : null)
                .equipment(booking.getEquipment().getName())
                .build();
    }
}