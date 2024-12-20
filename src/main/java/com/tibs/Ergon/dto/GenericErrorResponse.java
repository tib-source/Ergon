package com.tibs.Ergon.dto;

import org.springframework.http.HttpStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenericErrorResponse {
    private HttpStatus status; 
    private String message;
}
