package com.tibs.Ergon.request;


import lombok.Data;
import lombok.NonNull;

import java.time.LocalDate;

@NonNull
@Data
public class UserUpadeRequest {
    private String username;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String profilePicture;
}
