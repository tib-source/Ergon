package com.tibs.Ergon;

import com.tibs.Ergon.repository.BookingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
class Initializer implements CommandLineRunner {
    private final BookingRepository repository;
    public Initializer(BookingRepository repository){
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        // TODO: Make this extract data from my json file

    }
}
