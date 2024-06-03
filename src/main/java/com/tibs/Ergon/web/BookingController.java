package com.tibs.Ergon.web;

import com.sun.source.tree.LambdaExpressionTree;
import com.tibs.Ergon.model.BookingRepository;
import com.tibs.Ergon.model.Booking;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.*;
import java.awt.print.Book;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController("/api")
public class BookingController {
    private final Logger log = LoggerFactory.getLogger(BookingController.class);
    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository){
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/bookings")
    public Collection<Booking> bookings(){
        return bookingRepository.findAll();
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<?> getBooking(@PathVariable Long id){
        Optional<Booking> found = bookingRepository.findById(id);
        return found.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@Valid @RequestBody Booking booking) throws URISyntaxException {
        log.info("Requesting to create a new Booking: {}", booking);
        Booking created = bookingRepository.save(booking);
        return ResponseEntity.created(new URI("/api/bookings/" + created.getId())).body(created);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id){
        log.info("Requesting to delete booking: {}", id);
        bookingRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/booking/{id}")
    public ResponseEntity<Booking> updateBooking(@Valid @RequestBody Booking booking){
        log.info("Requesting to update Booking: {}", booking);
        Booking update = bookingRepository.save(booking);
        return ResponseEntity.ok().body(update);
    }
}

