package com.tibs.Ergon.controller;


import com.tibs.Ergon.model.Equipment;
import com.tibs.Ergon.repository.EquipmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;


@RestController
@RequestMapping("/api/equipments")
public class EquipmentController {

    private final Logger log = LoggerFactory.getLogger(EquipmentController.class);
    private final EquipmentRepository equipmentRepository;

    public EquipmentController(EquipmentRepository equipmentRepository){
        this.equipmentRepository = equipmentRepository;
    }

    // return all Equipments
    @GetMapping("")
    public Collection<Equipment> equipments(){
        return equipmentRepository.findAll();
    }
    // return Equipment by Id
    @GetMapping("/{id}")
    public ResponseEntity<?> getEquipment(@PathVariable Long id){
        Optional<Equipment> found = equipmentRepository.findById(id);
        return found.map(response -> ResponseEntity.ok().body(response)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    // create Equipment
    @PostMapping("")
    public ResponseEntity<Equipment> createEquipment(@Valid @RequestBody Equipment equipment) throws URISyntaxException {
        log.info("Request to create Equipment: {}", equipment);
        Equipment result = equipmentRepository.save(equipment);
        return ResponseEntity.created(new URI("/api/equipment/" + result.getId())).body(result);
    }
    // Update Equipment
    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@Valid @RequestBody Equipment equipment){
        log.info("Requesting to update Equipment: {}", equipment);
        Equipment update = equipmentRepository.save(equipment);
        return ResponseEntity.ok().body(update);
    }
    // Delete Equipment
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEquipment(@PathVariable Long id){
        log.info("Requesting to delete equipment: {}", id);
        equipmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
