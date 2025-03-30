package com.tibs.Ergon.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
public class UserInfoResponse {
    private String username;
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String profilePicture;
    private LocalDate dob;
}
