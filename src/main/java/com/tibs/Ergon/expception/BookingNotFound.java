package com.tibs.Ergon.expception;

public class BookingNotFound extends RuntimeException {
    public BookingNotFound() {
        super("Booking not found");
    }
}
