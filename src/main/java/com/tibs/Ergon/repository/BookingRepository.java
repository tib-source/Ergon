package com.tibs.Ergon.repository;

import com.tibs.Ergon.enums.BookingStatusEnum;
import com.tibs.Ergon.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByStatus(BookingStatusEnum status);
}