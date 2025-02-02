package com.tibs.Ergon.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.tibs.Ergon.enums.NotificationTypeEnum;
import com.tibs.Ergon.model.Notification;
import com.tibs.Ergon.repository.NotificationRepository;
import com.tibs.Ergon.repository.UserRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private final Map<Long, Set<SseEmitter>> userEmitters = new ConcurrentHashMap<>();


    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public void createNotification(NotificationTypeEnum type, Long userId, String message) {
        Notification notification = Notification.builder()
            .type(type)
            .user(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")))
            .message(message)
            .build();

        notificationRepository.save(notification);
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
                    }
                }
            );
        }
    }
    
}