package com.tibs.Ergon.service;

import com.tibs.Ergon.enums.RoleEnum;
import com.tibs.Ergon.expception.RoleNotFound;
import com.tibs.Ergon.expception.UserAlreadyExists;
import com.tibs.Ergon.expception.UserNotFound;
import com.tibs.Ergon.model.User;
import com.tibs.Ergon.repository.UserRepository;
import com.tibs.Ergon.request.UserRegistrationRequest;
import com.tibs.Ergon.request.UserUpdateRequest;
import com.tibs.Ergon.response.UserInfoResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;


@Service("userDetailsService")
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final ImageService imageService;

    public UserDetailsServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, ImageService imageService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.imageService = imageService;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFound::new);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true, getGrantedAuthorities(user.getRole()));
    }

    private Collection<GrantedAuthority> getGrantedAuthorities(RoleEnum role) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.toString()));
        return authorities;
    }

    public User registerUser(UserRegistrationRequest newUser) throws UserAlreadyExists, RoleNotFound {
        if (userRepository.existsByEmail(newUser.getEmail()) || userRepository.existsByUsername(newUser.getUsername())) {
            throw new UserAlreadyExists();
        }
        if (!newUser.getPassword().equals(newUser.getMatchingPassword())) {
            throw new RuntimeException("Passwords do not match");
        }
        User user = User.builder()
                .firstName(newUser.getFirstName())
                .lastName(newUser.getLastName())
                .email(newUser.getEmail())
                .username(newUser.getUsername())
                .password(passwordEncoder.encode(newUser.getPassword()))
                .enabled(true)
                .build();

        user.setRole(RoleEnum.ROLE_USER);

        userRepository.save(user);

        return user;
    }

    public User updateUser(String username, UserUpdateRequest updateDetails) {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFound::new);

        if (updateDetails.getProfilePicture() != null && !updateDetails.getProfilePicture().isEmpty()) {
            if (!updateDetails.getProfilePicture().equals(user.getProfilePicture())) {
                String uploaded = imageService.saveImage(updateDetails.getProfilePicture(), user.getUsername() + "_avatar");
                updateDetails.setProfilePicture(uploaded);
            }

        } else {
            updateDetails.setProfilePicture(user.getProfilePicture());
        }

        BeanUtils.copyProperties(updateDetails, user);


        return userRepository.save(user);

    }

    public UserInfoResponse getUserInfoByUsername(String username) throws UserNotFound {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFound::new);
        return UserInfoResponse.builder()
                .id(user.getId())
                .dob(user.getDob())
                .profilePicture(user.getProfilePicture())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();
    }
}
