package com.fitgen.rest.controller;

import com.fitgen.rest.exception.GPTKeyException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GPTController {

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    private String getApiKey() throws GPTKeyException {
        try {
            return new String(Files.readAllBytes(Paths.get("src/main/resources/GPTKey.pem"))).trim();
        } catch (IOException e) {
            throw new GPTKeyException("Error retrieving ChatGPT API key", e);
        }
    }

    public void testCall() throws GPTKeyException {
        try {
            String apiKey = getApiKey();

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("Content-Type", "application/json");

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("messages", List.of(
                    Map.of("role", "user", "content", "say hello back")
            ));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);

            System.out.println(response.getBody());

        } catch (GPTKeyException e) {
            throw new GPTKeyException("Error retrieving ChatGPT API key", e);
        } catch (RestClientException e) {
            throw new RestClientException("Error calling ChatGPT API", e);
        }
    }
}
