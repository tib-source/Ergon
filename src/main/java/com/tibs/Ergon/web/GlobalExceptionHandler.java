package com.tibs.Ergon.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.tibs.Ergon.dto.GenericErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GenericErrorResponse> handleGenericException(Exception e){
        GenericErrorResponse response = GenericErrorResponse.builder()
        .message(e.getMessage())
        .build();

        return ResponseEntity.internalServerError().body(response);
    }
}
