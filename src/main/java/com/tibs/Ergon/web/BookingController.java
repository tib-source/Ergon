package com.tibs.Ergon.web;

import com.tibs.Ergon.repository.BookingRepository;
import com.tibs.Ergon.model.Booking;
import com.tibs.Ergon.request.BookingRequest;
import com.tibs.Ergon.service.BookingService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RequestMapping("/api/bookings")
@RestController
public class BookingController {
    private final Logger log = LoggerFactory.getLogger(BookingController.class);
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    public BookingController(BookingRepository bookingRepository, BookingService bookingService){
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
    }

    @GetMapping("/")
    public Collection<Booking> bookings(){
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id){
        Optional<Booking> found = bookingRepository.findById(id);
        return found.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest request) throws URISyntaxException {
        log.info("Requesting to create a new Booking: {}", request);
        Booking created = bookingService.createBooking(request);
        return ResponseEntity.created(new URI("/api/bookings/" + created.getId())).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id){
        log.info("Requesting to delete booking: {}", id);
        bookingRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@Valid @RequestBody Booking booking){
        log.info("Requesting to update Booking: {}", booking);
        Booking update = bookingRepository.save(booking);
        return ResponseEntity.ok().body(update);
    }
}

