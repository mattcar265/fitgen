package com.fitgen.rest.controller;

import com.fitgen.rest.exception.InvalidCredentialsException;
import com.fitgen.rest.exception.UserAlreadyExistsException;
import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Date;

import static com.fitgen.rest.controller.SignUpController.isValidPassword;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    private final String JWT_SECRET = System.getenv("JWT_SECRET");

    private final long JWT_EXPIRATION_MS = 40000000;

    @PostMapping
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, Object> body) throws InvalidCredentialsException, UserAlreadyExistsException {
        System.out.println("Received Login credentials data from frontend:" + body);

        String email = (String) body.get("email");
        String password = (String) body.get("password");

        if(!validateLoginForm(email, password)) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Login credentials were not valid");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        User user = userRepository.findByEmailAndPassword(email, password);

        if(user == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Login credentials were not valid");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        String token = generateJwtToken(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = JWT_SECRET.getBytes(StandardCharsets.UTF_8);
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS512.getJcaName());
    }

    private String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUserId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS))
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateLoginForm(String email, String password) throws UserAlreadyExistsException {
        return isValidEmail(email) && isValidPassword(password);
    }

    public static boolean isValidEmail(String email) {
        return email.contains("@") && email.lastIndexOf('.') > email.indexOf('@') + 1;
    }
}
