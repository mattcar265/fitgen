package com.fitgen.rest.controller;

import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import com.fitgen.rest.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/fitness-goals")
    public ResponseEntity<String> updateFitnessGoals(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> body) throws Exception {
        String jwt = authHeader.substring(7);
        String userIdString = jwtUtil.extractUserId(jwt);

        String primaryGoal = (String) body.get("primaryGoal");
        String secondaryGoal = (String) body.get("secondaryGoal");

        User user = userRepository.findById(userIdString).orElseThrow(() -> new Exception("User not found"));
        user.setPrimaryGoal(primaryGoal);
        user.setSecondaryGoal(secondaryGoal);

        userRepository.save(user);

        return ResponseEntity.ok("Fitness goals updated");
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> updateFitnessGoals(@RequestHeader("Authorization") String authHeader) throws Exception {
        String jwt = authHeader.substring(7);
        String userIdString = jwtUtil.extractUserId(jwt);

        User user = userRepository.findById(userIdString).orElseThrow(() -> new Exception("User not found"));
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String email = user.getEmail();
        String phone = user.getPhone();
        int height = user.getHeight();
        int weight = user.getWeight();
        int age = user.getAge();

        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("firstName", firstName);
        userDetails.put("lastName", lastName);
        userDetails.put("email", email);
        userDetails.put("phone", phone);
        userDetails.put("height", String.valueOf(height));
        userDetails.put("weight", String.valueOf(weight));
        userDetails.put("age", String.valueOf(age));

        return ResponseEntity.ok(userDetails);
    }

    @PutMapping("/account-details")
    public ResponseEntity<String> updateAccountDetails(@RequestHeader("Authorization") String authHeader, @RequestBody Map<String, Object> body) throws Exception {
        String jwt = authHeader.substring(7);
        String userIdString = jwtUtil.extractUserId(jwt);

        String firstName = (String) body.get("firstName");
        String lastName = (String) body.get("lastName");
        String email = (String) body.get("email");
        String phone = (String) body.get("phone");
        int height = Integer.parseInt(body.get("height").toString());
        int weight = (int) Integer.parseInt(body.get("weight").toString());
        int age = (int) Integer.parseInt(body.get("age").toString());

        User user = userRepository.findById(userIdString).orElseThrow(() -> new Exception("User not found"));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPhone(phone);
        user.setHeight(height);
        user.setWeight(weight);
        user.setAge(age);

        userRepository.save(user);

        return ResponseEntity.ok("Fitness goals updated");
    }
}
