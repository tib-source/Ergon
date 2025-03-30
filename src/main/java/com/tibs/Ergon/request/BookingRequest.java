package com.tibs.Ergon.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long equipmentId;
    private LocalDate from;
    private LocalDate to;
    private String reason;
}
