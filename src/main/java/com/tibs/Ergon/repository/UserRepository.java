package com.tibs.Ergon.repository;
import com.tibs.Ergon.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
