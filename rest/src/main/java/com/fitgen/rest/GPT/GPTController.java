package com.fitgen.rest.GPT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class GPTController {

    @Qualifier("GPTRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Value("${gpt.model")
    private String model;

    @Value("${gpt.api.url")
    private String apiUrl;

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt) {
        GPTRequest request = new GPTRequest(model, prompt);


        String response = restTemplate.postForObject(apiUrl, request, ChatResponse.class);
    }
}
