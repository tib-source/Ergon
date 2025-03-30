package com.tibs.Ergon.model;

import com.tibs.Ergon.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email"),

})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String address;
    private String password;
    private String profilePicture;
    private boolean enabled;
    private boolean tokenExpired;
    private RoleEnum role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<Booking> bookings;
}
