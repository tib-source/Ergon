package com.tibs.Ergon.expception;

public class RoleNotFound extends RuntimeException {
    public RoleNotFound() {
        super("Role not found");
    }
}
