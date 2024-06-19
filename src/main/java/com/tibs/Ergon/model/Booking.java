package com.tibs.Ergon.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_booking")
public class Booking {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private LocalDate from_date;
    private LocalDate to_date;
    private Boolean approved;
    private Boolean returned;
    private String reason;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;


}
