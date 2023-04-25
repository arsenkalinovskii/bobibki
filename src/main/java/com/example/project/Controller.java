package com.example.project;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {
    private final UserRepository userRepository;

    public Controller(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(new User(user.getFirstname(), user.getLastname()));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        // User ReturnUser = userRepository.findById(id).get();
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}