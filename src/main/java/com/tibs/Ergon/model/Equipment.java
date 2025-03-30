package com.tibs.Ergon.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

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

}