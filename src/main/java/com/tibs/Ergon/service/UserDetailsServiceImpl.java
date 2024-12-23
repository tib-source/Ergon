package com.tibs.Ergon.service;

import com.tibs.Ergon.expception.RoleNotFound;
import com.tibs.Ergon.expception.UserAlreadyExists;
import com.tibs.Ergon.expception.UserNotFound;
import com.tibs.Ergon.model.Role;
import com.tibs.Ergon.model.User;
import com.tibs.Ergon.repository.RoleRepository;
import com.tibs.Ergon.repository.UserRepository;
import com.tibs.Ergon.request.UserRegistrationRequest;
import jakarta.transaction.Transactional;
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

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).orElseThrow(UserNotFound::new);
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.isEnabled(), user.isTokenExpired(), true, true,getGrantedAuthorities(user.getRoles()));
    }

    private Collection<GrantedAuthority> getGrantedAuthorities(Collection<Role> roles) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.toString()));
        }
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
                .password(passwordEncoder.encode(newUser.getPassword()))
                .build();
        user.getRoles().add(roleRepository.findByName("ROLE_USER").orElseThrow(RoleNotFound::new));

        userRepository.save(user);

        return user;
    }
}
