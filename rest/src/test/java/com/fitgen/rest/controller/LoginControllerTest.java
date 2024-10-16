package com.fitgen.rest.controller;

import com.fitgen.rest.exception.InvalidCredentialsException;
import com.fitgen.rest.exception.UserAlreadyExistsException;
import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class LoginControllerTest {

    @InjectMocks
    private LoginController loginController;

    @Mock
    private UserRepository userRepository;

    @Test
    void loginTest() throws InvalidCredentialsException, UserAlreadyExistsException {
        MockitoAnnotations.openMocks(this);

        User mockUser = new User();

        when(userRepository.findByEmailAndPassword("matt@gmail.com", "password101!")).thenReturn(mockUser);
        when(userRepository.findByEmailAndPassword("bademail@gmail.com", "randompassword")).thenReturn(null);

        Map<String, Object> request1 = new HashMap<>();
        request1.put("email", "matt@gmail.com");
        request1.put("password", "password101!");

        Map<String, Object> request2 = new HashMap<>();
        request2.put("email", "bademail@gmail.com");
        request2.put("password", "randompassword");

        ResponseEntity<Map<String, String>> response1 = loginController.login(request1);
        ResponseEntity<Map<String, String>> response2 = loginController.login(request2);

        assertEquals(HttpStatusCode.valueOf(200), response1.getStatusCode());
        assertEquals(HttpStatusCode.valueOf(400), response2.getStatusCode());
    }
}
