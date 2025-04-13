package com.tibs.Ergon.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.tibs.Ergon.enums.BookingStatusEnum;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private LocalDate booked_from;
    private LocalDate booked_to;
    private BookingStatusEnum status;
    private Boolean returned;
    private String reason;
    private LocalDate returnedDate;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User approver;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Equipment equipment;


}
