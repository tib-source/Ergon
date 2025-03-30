package com.tibs.Ergon.expception;

public class UserNotFound extends RuntimeException {
    public UserNotFound() {
        super("The supplied User cannot be found.");
    }
}
