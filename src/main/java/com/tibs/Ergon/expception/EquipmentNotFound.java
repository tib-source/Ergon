package com.tibs.Ergon.expception;

public class EquipmentNotFound extends RuntimeException {
    public EquipmentNotFound() {
        super("The provided Equipment could not be found, please try again");
    }
}
