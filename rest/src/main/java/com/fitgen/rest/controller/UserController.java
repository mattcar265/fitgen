package com.fitgen.rest.controller;

import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import com.fitgen.rest.util.JwtUtil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
