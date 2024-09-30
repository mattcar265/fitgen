package com.fitgen.rest.controller;

import com.fitgen.rest.exception.GPTKeyException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class GPTControllerTest {

    GPTController gptController = new GPTController();

    @Test
    void testCallTest() throws GPTKeyException {
        assertDoesNotThrow(gptController::testCall);
    }
}