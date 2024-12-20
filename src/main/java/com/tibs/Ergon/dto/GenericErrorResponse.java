package com.tibs.Ergon.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GenericErrorResponse {
    private String message;
}
