package com.fitgen.rest.exception;

public class SignupDataToMongoException extends Exception {
    public SignupDataToMongoException(String message) {
        super(message);
    }

    public SignupDataToMongoException(String message, Throwable cause) {
        super(message, cause);
    }
}