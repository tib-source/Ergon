package com.tibs.Ergon.repository;

import com.tibs.Ergon.model.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByReturnedFalseAndApprovedTrue();
}
