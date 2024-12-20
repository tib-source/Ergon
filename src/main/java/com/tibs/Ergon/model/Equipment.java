package com.tibs.Ergon.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "equipments")
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String name;
//    @Enumerated(EnumType.STRING)
    private String type;
    private String location;
    private String status;
    private int quantity;
    private LocalDate last_audit;
    private String comment;

    @OneToOne(mappedBy = "equipment")
    @JsonBackReference
    private Booking booking;

}