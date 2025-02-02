package com.tibs.Ergon.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.tibs.Ergon.enums.NotificationTypeEnum;
import com.tibs.Ergon.model.Booking;
import com.tibs.Ergon.model.Notification;
import com.tibs.Ergon.repository.BookingRepository;
import com.tibs.Ergon.repository.NotificationRepository;
import com.tibs.Ergon.repository.UserRepository;

@Service
public class NotificationService {

    private static final int[] REMINDER_DAYS = {1, 3, 7};

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    private final Map<Long, Set<SseEmitter>> userEmitters = new ConcurrentHashMap<>();


    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository, BookingRepository bookingRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    public void createNotification(NotificationTypeEnum type, Long userId, String message) {
        Notification notification = Notification.builder()
            .type(type)
            .user(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")))
            .message(message)
            .build();
        notificationRepository.save(notification);
        logger.info(notification.toString());
        notify(notification);
    }

    public List<Notification> getNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    public void addEmitter(Long userId, SseEmitter emitter) {
        userEmitters.computeIfAbsent(userId, key -> ConcurrentHashMap.newKeySet()).add(emitter);
    }

    public void removeEmitter(Long userId, SseEmitter emitter) {
        userEmitters.computeIfPresent(userId, (key, set) -> {
            set.remove(emitter);
            return set.isEmpty() ? null : set;
        });
    }

    public void notify(Notification notification) {
        Set<SseEmitter> emitters = userEmitters.get(notification.getUser().getId());
        if (emitters != null){
            emitters.removeIf(
                emitter -> {
                    try{
                        emitter.send(notification);
                        return false;
                    } catch (IOException e){
                        // Log the error
                        System.err.println("Error sending notification: " + e.getMessage());
                        return true;
                    } catch (Exception e){
                        // Log the error
                        System.err.println("Error sending notification: " + e.getMessage());
                        return true;
                    }
                }
            );
        }
    }

    @Scheduled(cron = "0 0 0 * * *") // Every day at midnight
    public void checkBookingsAndNotify() {
        List<Booking> activeBookings = bookingRepository.findAll();

        for (Booking booking: activeBookings) {
            int daysUntilDue = LocalDate.now().until(booking.getBooked_to()).getDays();
            
            if (daysUntilDue < 0) {
                createNotification(NotificationTypeEnum.OUTSTANDING_RETURN, booking.getUser().getId(), "Booking for " + booking.getEquipment().getName() + " is overdue");
            }

            for (int reminderDay: REMINDER_DAYS) {
                if (daysUntilDue == reminderDay) {
                    createNotification(NotificationTypeEnum.UPCOMING_RETURN, booking.getUser().getId(), "Booking for " + booking.getEquipment().getName() + " is due in " + reminderDay + " days");
                }
            }
        }
    }
    
}