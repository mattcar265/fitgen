package com.fitgen.rest.exception;

public class GPTKeyException extends Exception {
    public GPTKeyException(String message) {
        super(message);
    }

    public GPTKeyException(String message, Throwable cause) {
        super(message, cause);
    }
}