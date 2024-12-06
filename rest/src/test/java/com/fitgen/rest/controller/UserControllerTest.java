package com.fitgen.rest.controller;

import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import com.fitgen.rest.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

public class UserControllerTest {
    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserController userController;

    @Mock
    JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void updateFitnessGoalsTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "myIdString";
        String primaryGoal = "Build Strength";
        String secondaryGoal = "Hit 225 on bench";

        Map<String, Object> body = new HashMap<>();
        body.put("primaryGoal", primaryGoal);
        body.put("secondaryGoal", secondaryGoal);

        User user = new User();
        user.setUserId(userIdString);

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.of(user));

        ResponseEntity<String> response = userController.updateFitnessGoals(authHeader, body);

        assertEquals("Fitness goals updated", response.getBody());
        assertEquals(primaryGoal, user.getPrimaryGoal());
        assertEquals(secondaryGoal, user.getSecondaryGoal());
    }

    @Test
    void updateFitnessGoalsUserNotFoundTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "myIdString";
        String primaryGoal = "Build Strength";
        String secondaryGoal = "Hit 225 on bench";

        Map<String, Object> body = new HashMap<>();
        body.put("primaryGoal", primaryGoal);
        body.put("secondaryGoal", secondaryGoal);

        User user = new User();
        user.setUserId(userIdString);

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            userController.updateFitnessGoals(authHeader, body);
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void personalInformationValidationTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "myIdString";

        Map<String, Object> body = new HashMap<>();
        body.put("firstName", "matt");
        body.put("lastName", "developer");
        body.put("email", "matt.developer@testingstuff.com");
        body.put("phone", "1234567890");
        body.put("height", "180");
        body.put("weight", "100");
        body.put("age", "24");

        User user = new User();
        user.setUserId(userIdString);

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.of(user));

        ResponseEntity<String> response = userController.updateAccountDetails(authHeader, body);

        assertEquals("Fitness goals updated", response.getBody());
        assertEquals("matt", user.getFirstName());
        assertEquals("developer", user.getLastName());
        assertEquals("matt.developer@testingstuff.com", user.getEmail());
        assertEquals("1234567890", user.getPhone());
        assertEquals(180, user.getHeight());
        assertEquals(100, user.getWeight());
        assertEquals(24, user.getAge());
    }

    @Test
    void personalInformationForNonExistantAccountTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "myIdString";

        Map<String, Object> body = new HashMap<>();
        body.put("firstName", "matt");
        body.put("lastName", "developer");
        body.put("email", "matt.developer@testingstuff.com");
        body.put("phone", "1234567890");
        body.put("height", "180");
        body.put("weight", "100");
        body.put("age", "24");

        User user = new User();
        user.setUserId(userIdString);

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            userController.updateAccountDetails(authHeader, body);
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void deleteAccountTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "myIdString";

        User user = new User();
        user.setUserId(userIdString);

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.of(user));

        ResponseEntity<String> response = userController.deleteAccount(authHeader);

        assertEquals("User deleted", response.getBody());
    }

    @Test
    void deleteAccountNonExistentUserTest() {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "myIdString";

        User user = new User();
        user.setUserId(userIdString);

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            userController.deleteAccount(authHeader);
        });

        assertEquals("User not found", exception.getMessage());
    }
}
