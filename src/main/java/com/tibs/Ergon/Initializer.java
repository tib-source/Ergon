package com.tibs.Ergon;

import com.tibs.Ergon.enums.EquipmentStatusEnum;
import com.tibs.Ergon.model.Equipment;
import com.tibs.Ergon.repository.BookingRepository;
import com.tibs.Ergon.repository.EquipmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
class Initializer implements CommandLineRunner {
    private final BookingRepository repository;
    private final EquipmentRepository equipmentRepository;
    public Initializer(BookingRepository repository, EquipmentRepository equipmentRepository){
        this.repository = repository;
        this.equipmentRepository = equipmentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        for (Equipment equipment : equipmentRepository.findAll()) {
            if(equipment.getStatus() == null) {
                equipment.setStatus(String.valueOf(EquipmentStatusEnum.AVAILABLE));
            }else {

                switch (equipment.getStatus()) {
                    case "On_loan": equipment.setStatus(String.valueOf(EquipmentStatusEnum.ON_LOAN)); break;
                    case "Repairing": equipment.setStatus(String.valueOf(EquipmentStatusEnum.REPAIRING)); break;
                    case "Decommisioned": equipment.setStatus(String.valueOf(EquipmentStatusEnum.DECOMMISSIONED)); break;
                    case "Available": equipment.setStatus(String.valueOf(EquipmentStatusEnum.AVAILABLE)); break;
                }

            }

        }
    }
}
