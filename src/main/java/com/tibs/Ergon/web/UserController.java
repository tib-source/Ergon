package com.tibs.Ergon.web;


import com.tibs.Ergon.expception.UserNotFound;
import com.tibs.Ergon.model.User;
import com.tibs.Ergon.repository.UserRepository;
import com.tibs.Ergon.request.UserUpadeRequest;
import com.tibs.Ergon.response.UserInfoResponse;
import com.tibs.Ergon.service.UserDetailsServiceImpl;
import com.tibs.Ergon.util.UserUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    private final UserDetailsServiceImpl userDetailsService;
    private final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(UserRepository userRepository, UserDetailsServiceImpl userDetailsService) {
        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;

    }

//    @PreAuthorize(value = "ADMIN")
    @GetMapping("")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserInfoResponse> deleteUser(@PathVariable String username) {
        log.info("Requesting to retrieve User: {}", username);
        UserInfoResponse response = userDetailsService.getUserInfoByUsername(username);
        log.error(String.valueOf(response));
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        log.info("Requesting to delete User: {}", id);
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@Valid @RequestBody UserUpadeRequest updateRequest){
        log.info("Requesting to update User: {}", updateRequest);
        String requestUser = UserUtil.userName();
        User user = userRepository.findByUsername(requestUser).orElseThrow(UserNotFound::new);
        user.setUsername(updateRequest.getUsername());
        user.setFirstName(updateRequest.getFirstName());
        user.setLastName(updateRequest.getLastName());
        user.setDob(updateRequest.getDob());
        user.setProfilePicture(updateRequest.getProfilePicture());

        User updated = userRepository.save(user);

        return ResponseEntity.ok().body(updated);
    }
}
