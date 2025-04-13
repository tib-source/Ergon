package com.tibs.Ergon.controller;

import com.tibs.Ergon.model.Booking;
import com.tibs.Ergon.repository.BookingRepository;
import com.tibs.Ergon.request.BookingRequest;
import com.tibs.Ergon.service.BookingService;
import com.tibs.Ergon.util.UserUtil;
import com.tibs.Ergon.dto.BookingResponseDTO;
import com.tibs.Ergon.mapper.BookingMapper;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("/api/bookings")
@RestController
public class BookingController {
    private final Logger log = LoggerFactory.getLogger(BookingController.class);
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;
    private final BookingMapper bookingMapper;

    @Autowired
    public BookingController(BookingService bookingService, BookingMapper bookingMapper, BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingMapper = bookingMapper;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("")
    public ResponseEntity<List<BookingResponseDTO>> bookings() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingResponseDTO> dtos = bookings.stream()
                .map(bookingMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id) {
        Booking booking = this.bookingService.getBookingById(id);
        return ResponseEntity.ok(this.bookingMapper.toDTO(booking));
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveBooking(@PathVariable Long id) {
        String currentUser = UserUtil.userName();
        bookingService.approveBooking(id, currentUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<?> rejectBooking(@PathVariable Long id) {
        String currentUser = UserUtil.userName();
        bookingService.rejectBooking(id, currentUser);
        return ResponseEntity.ok().build();
    }

    @PostMapping("")
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest request) throws URISyntaxException {
        log.info("Requesting to create a new Booking: {}", request);
        Booking created = bookingService.createBooking(request);
        return ResponseEntity.created(new URI("/api/bookings/" + created.getId())).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        log.info("Requesting to delete booking: {}", id);
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isPresent()) {
            bookingService.cancelBooking(booking.get());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@Valid @RequestBody Booking booking) {
        log.info("Requesting to update Booking: {}", booking);
        Booking update = bookingRepository.save(booking);
        return ResponseEntity.ok().body(update);
    }
}

