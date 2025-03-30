package com.tibs.Ergon.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.tibs.Ergon.enums.NotificationTypeEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "user")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    private NotificationTypeEnum type;

    private boolean read;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}