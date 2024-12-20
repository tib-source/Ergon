package com.tibs.Ergon.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    private Date booked_from;
    private Date booked_to;
    private Boolean approved;
    private Boolean returned;
    private String reason;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private User approver;

    @ManyToOne( cascade = CascadeType.ALL)
    private Equipment equipment;

    


}
