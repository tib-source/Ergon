package com.tibs.Ergon.request;

import lombok.Data;
import lombok.NonNull;

import java.sql.Date;

@Data
public class UserRegistrationRequest {
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private String matchingPassword;
    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
    @NonNull
    private String email;
    @NonNull
    private Date dob;

}
