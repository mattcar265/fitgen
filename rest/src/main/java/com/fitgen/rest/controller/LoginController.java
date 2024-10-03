package com.fitgen.rest.controller;

import com.fitgen.rest.exception.InvalidCredentialsException;
import com.fitgen.rest.exception.UserAlreadyExistsException;
import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.fitgen.rest.controller.SignUpController.isValidPassword;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> login(@RequestBody Map<String, Object> body) throws InvalidCredentialsException, UserAlreadyExistsException {
        System.out.println("Received Login credentials data from frontend:" + body);

        String email = (String) body.get("email");
        String password = (String) body.get("password");

        if(!validateLoginForm(email, password)) {
            return ResponseEntity.badRequest().body("Login credentials were not valid");
        }

        User user = userRepository.findByEmailAndPassword(email, password);

        if(user == null) {
            return ResponseEntity.badRequest().body("Login credentials were not valid");
        }

        return ResponseEntity.ok("Login was successful");
    }

    public boolean validateLoginForm(String email, String password) throws UserAlreadyExistsException {
        return isValidEmail(email) && isValidPassword(password);
    }

    public static boolean isValidEmail(String email) {
        return email.contains("@") && email.lastIndexOf('.') > email.indexOf('@') + 1;
    }
}
