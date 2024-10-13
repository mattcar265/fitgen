package com.fitgen.rest.controller;

import com.fitgen.rest.exception.SignupDataToMongoException;
import com.fitgen.rest.exception.UserAlreadyExistsException;
import com.fitgen.rest.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class SignUpControllerTest {

    @InjectMocks
    private SignUpController signUpController;

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void signUpSuccessTest() throws SignupDataToMongoException, UserAlreadyExistsException {
        MockitoAnnotations.openMocks(this);

        Map<String, Object> request = new HashMap<>();
        request.put("email", "test@example.com");
        request.put("password", "fitgentestpassword12");
        request.put("phone", "1234567890");
        request.put("height", "80");
        request.put("weight", "200");
        request.put("age", "24");
        request.put("gender", "male");

        ResponseEntity<String> response = signUpController.signUp(request);

        assertEquals(HttpStatusCode.valueOf(200), response.getStatusCode());
    }
}