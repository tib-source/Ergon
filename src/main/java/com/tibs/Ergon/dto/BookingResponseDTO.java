package com.tibs.Ergon.dto;

import java.time.LocalDate;

import com.tibs.Ergon.enums.BookingStatusEnum;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookingResponseDTO {
    private Long id;
    private LocalDate bookedFrom;
    private LocalDate bookedTo;
    private BookingStatusEnum status;
    private String reason;
    private Long userId;
    private String userName;
    private Long approverId;
    private String approverName;
    private String equipment;
}