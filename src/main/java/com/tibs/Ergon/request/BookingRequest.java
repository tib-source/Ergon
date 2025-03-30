package com.tibs.Ergon.request;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingRequest {
    private Long equipmentId;
    private LocalDate from;
    private LocalDate to; 
    private String reason;
}
