package com.fitgen.rest.GPT;

public class GPTRequest {
    private String model;
    private String message;

    public GPTRequest(String model, String prompt) {
        this.model = model;

        this.message = prompt;
    }
}