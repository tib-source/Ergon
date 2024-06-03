package com.tibs.Ergon.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String address;
    private String student_id;
    private String staff_id;
    private String user_type_flag;
    private String department;
    private String course;
    private String campus;

}
