package com.fitgen.rest.service;

import com.fitgen.rest.exception.GPTKeyException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GPTService {

    private static final String API_URL = "https://api.openai.com/v1/chat/completions";

    public String getApiKey() throws GPTKeyException {
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

    public String generateWorkoutPlan(String planName, String duration, String description) throws GPTKeyException {
        try {
            String apiKey = getApiKey();

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("Content-Type", "application/json");

            String gptPrompt = String.format(
                    """
                    Generate a workout plan in JSON format based on the following parameters:
                    1. planName (optional): if provided, use it as the name of the workout plan. if not, generate one contextually.
                    2. duration (optional): if provided, use it as the total length of the work. If not, generate one in minutes.
                    3. description (optional): if provided, use it as a guide of what type of workout this should be.
                    The JSON must contain the following fields:
                    - planId: leave it blank in the JSON.
                    - planName: if provided as parameter, use the parameter. If not, generate one contextually.
                    - notes: if applicable, provide special reminders or notes.
                    - creationDate: leave it blank in the JSON.
                    - exercises: a nested JSON of each exercise of the workout plan, where each exercise contains:
                        - exerciseName: generate a name for the exercise.
                        - duration: if applicable, generate a duration for the exercise in minutes.
                        - instructions: if applicable, generate instructions for the exercise.
                        - sets: if applicable, amount of sets for the exercise.
                        - reps: if applicable, amount of reps for the exercise.
                    Note: if something is not applicable, set to null.
                    Only return the JSON, as this string response will be used to convert to JSON.
                    Below is an example JSON:
                    {
                      "planId": %s,
                      "duration": %s,
                      "description": "%s",
                      "creationDate": null,
                      "exercises": [
                        {
                          "exerciseName": "Warmup",
                          "duration": 5,
                          "instructions": "treadmill at a light pace",
                          "sets": null,
                          "reps": null
                        },
                        {
                          "exerciseName": "Bench Press",
                          "duration": null,
                          "instructions": null,
                          "sets": 3,
                          "reps": 8
                        }
                      ]
                    }
                    """, planName, duration, description);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("messages", List.of(
                    Map.of("role", "user", "content", gptPrompt)
            ));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);

            System.out.println(response.getBody());

            return response.getBody();
        } catch (GPTKeyException e) {
            throw new GPTKeyException("Error retrieving ChatGPT API key", e);
        } catch (RestClientException e) {
            throw new RestClientException("Error calling ChatGPT API", e);
        }
    }
}
