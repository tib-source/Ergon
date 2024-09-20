package com.tibs.Ergon.expception;

public class EquipmentNotAvailable extends RuntimeException{
    public EquipmentNotAvailable() {
        super("Equipment not available");
    }
}
