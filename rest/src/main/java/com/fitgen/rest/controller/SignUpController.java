package com.fitgen.rest.controller;

import com.fitgen.rest.exception.SignupDataToMongoException;
import com.fitgen.rest.exception.UserAlreadyExistsException;
import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import com.fitgen.rest.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/signup")
public class SignUpController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> signUp(@RequestBody Map<String, Object> body) throws SignupDataToMongoException, UserAlreadyExistsException {
        System.out.println("Received JSON data from frontend:" + body);

        if(!validateSignUpForm(body)) {
            return ResponseEntity.badRequest().body("Signup data was not valid");
        }

        String email = (String) body.get("email");
        String password = (String) body.get("password");
        String phone = (String) body.get("phone");
        int height = Integer.parseInt((String) body.get("height"));
        int weight = Integer.parseInt((String) body.get("weight"));
        int age = Integer.parseInt((String) body.get("age"));
        String gender = (String) body.get("gender");

        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setPhone(phone);
        user.setHeight(height);
        user.setWeight(weight);
        user.setAge(age);
        user.setGender(gender);

        try {
            userRepository.save(user);
        } catch(Exception  e) {
            throw new SignupDataToMongoException("Error sending processed user data to MongoDB", e);
        }

        emailService.sendWelcomeEmail(email);

        return ResponseEntity.ok("Signup data received and processed successfully");
    }

    public boolean validateSignUpForm(Map<String, Object> body) throws UserAlreadyExistsException {
        String email = (String) body.get("email");
        String password = (String) body.get("password");
        String phone = (String) body.get("phone");
        String height = (String) body.get("height");
        String weight = (String) body.get("weight");
        String age = (String) body.get("age");

        return isValidEmail(email) && isValidPassword(password) && isValidPhone(phone)
                && isValidHeight(height) && isValidWeight(weight) && isValidAge(age);
    }

    public boolean isValidEmail(String email) throws UserAlreadyExistsException {
        if(userAlreadyExists(email)) {
            throw new UserAlreadyExistsException("User with the provided email already exists");
        }

        return email.contains("@") && email.lastIndexOf('.') > email.indexOf('@') + 1;
    }

    public boolean userAlreadyExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public static boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int nonLetterCount = 0;
        for (char c : password.toCharArray()) {
            if (!Character.isLetter(c)) {
                nonLetterCount++;
            }
            if (nonLetterCount >= 2) {
                return true;
            }
        }

        return false;
    }

    public static boolean isValidPhone(String phone) {
        return phone.matches("[0-9]+") && phone.length() >= 10;
    }

    public static boolean isValidHeight(String height) {
        return height.matches("[0-9]+") && (Integer.parseInt(height) > 0) && (Integer.parseInt(height) < 300);
    }

    public static boolean isValidWeight(String weight) {
        return weight.matches("[0-9]+") && (Integer.parseInt(weight) > 0) && (Integer.parseInt(weight) < 1500);
    }

    public static boolean isValidAge(String age) {
        return age.matches("[0-9]+") && (Integer.parseInt(age) > 0) && (Integer.parseInt(age) < 300);
    }
}