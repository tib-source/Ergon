package com.tibs.Ergon.request;

import java.sql.Date;
import com.tibs.Ergon.model.User;

import lombok.Data;

@Data
public class BookingRequest {
    private Long equipmentId;
//    private Long userId;
    private Date from; 
    private Date to; 
    private String reason;
}
