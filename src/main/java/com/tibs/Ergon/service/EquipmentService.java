package com.tibs.Ergon.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tibs.Ergon.expception.EquipmentNotFound;
import com.tibs.Ergon.model.Booking;
import com.tibs.Ergon.model.Equipment;
import com.tibs.Ergon.repository.EquipmentRepository;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;


    public Equipment findById(Long id) {

        return equipmentRepository.findById(id).orElseThrow(
                EquipmentNotFound::new);

    }

    public Boolean isAvailable(Equipment equipment) {
        return equipment.getStatus().equals("Available") && equipment.getQuantity() > 0;
    }


    public Equipment linkToBooking(Booking booking, Equipment equipment){
        this.DecrementQuantity(equipment);
        equipmentRepository.save(equipment);
        return equipment;

    }

    public void DecrementQuantity(Equipment equipment){
        if (equipment.getQuantity() <= 0) {
            throw new IllegalStateException("Equipment quantity is already 0 - OUT OF STOCK");
        }

        equipment.setQuantity(equipment.getQuantity() - 1);
        equipmentRepository.save(equipment);
    }

}
