package com.tibs.Ergon.controller;

import com.tibs.Ergon.dto.GenericErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericErrorResponse> handleGenericException(Exception e) {
        GenericErrorResponse response = GenericErrorResponse.builder()
                .message(e.getMessage())
                .build();

        return ResponseEntity.internalServerError().body(response);
    }
}
