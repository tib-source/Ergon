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
@Table(name = "equipment")
public class Equipment {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    private String type;
    private String location;
    private String status;
    private int quantity;
    private LocalDate last_audit;
    private String comment;

    @OneToOne(cascade = CascadeType.PERSIST)
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Booking booking;
}