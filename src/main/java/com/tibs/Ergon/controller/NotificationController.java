package com.tibs.Ergon.controller;

import com.tibs.Ergon.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private static final Logger logging = LoggerFactory.getLogger(NotificationController.class);

    @Autowired
    public NotificationService notificationService;


    @GetMapping("/users/{id}")
    public ResponseEntity<?> getNotifications(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getNotifications(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/stream")
    public SseEmitter streamNotifications(@RequestParam Long userId) {
        logging.info("User {} connected to notifications stream", userId);
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        notificationService.addEmitter(userId, emitter);
        return emitter;
    }

    @PostMapping("/check-bookings")
    public ResponseEntity<?> checkBookings() {
        logging.info("Checking bookings and sending notifications");
        notificationService.checkBookingsAndNotify();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/unread/{id}")
    public ResponseEntity<?> getUnreadNotification(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getUnreadNotifications(id));
    }
}

