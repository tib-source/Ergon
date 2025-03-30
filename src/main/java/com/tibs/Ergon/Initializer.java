package com.tibs.Ergon;

import com.tibs.Ergon.enums.EquipmentStatusEnum;
import com.tibs.Ergon.enums.RoleEnum;
import com.tibs.Ergon.model.Equipment;
import com.tibs.Ergon.model.User;
import com.tibs.Ergon.repository.EquipmentRepository;
import com.tibs.Ergon.repository.UserRepository;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;

@Component
class Initializer implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private String getValidStringValue(CSVRecord record, String key) {

        String value = record.get(key);
        if (value == null || value.equals("null") || value.isEmpty()) {
            if (key.equals("status")) {
                return "available";
            } else {
                return "";
            }
        }
        return value;
    }


    @Override
    public void run(String... args) {
        logger.info("Initializing data - reading from inventory.csv ...");
        try (
                BufferedReader br = new BufferedReader(new InputStreamReader(new ClassPathResource("inventory.csv").getInputStream()))
        ) {
            CSVFormat csvFormat = CSVFormat.EXCEL.builder().setHeader().setSkipHeaderRecord(true).build();
            CSVParser parser = new CSVParser(br, csvFormat);
            for (CSVRecord record : parser.getRecords()) {
                Equipment equipment = Equipment.builder()
                        .name(this.getValidStringValue(record, "name"))
                        .type(this.getValidStringValue(record, "type"))
                        .status(this.setStatus(this.getValidStringValue(record, "status")))
                        .comment(this.getValidStringValue(record, "comments"))
                        .location(this.getValidStringValue(record, "location"))
                        .last_audit(LocalDate.parse(record.get("audit")))
                        .quantity(Integer.parseInt(record.get("quantity")))
                        .build();

                equipmentRepository.save(equipment);
            }

            User user = User.builder()
                    .firstName("John")
                    .lastName("Doe")
                    .username("admin")
                    .password(passwordEncoder.encode("password"))
                    .role(RoleEnum.ROLE_ADMIN)
                    .email("John.doe@gmail.com")
                    .profilePicture("test")
                    .dob(LocalDate.of(1990, 1, 1))
                    .enabled(true)
                    .build();

            userRepository.save(user);


        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }

    public String setStatus(String value) {
        return switch (value) {
            case "On_loan" -> EquipmentStatusEnum.Loaned.name();
            case "repairing" -> EquipmentStatusEnum.Repairing.name();
            case "Decommisioned" -> EquipmentStatusEnum.Decommissioned.name();
            default -> EquipmentStatusEnum.Available.name();
        };
    }
}
