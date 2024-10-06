package com.fitgen.rest.controller;

import com.fitgen.rest.exception.GPTKeyException;
import com.fitgen.rest.service.GPTService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class GPTControllerTest {

    GPTService gptService = new GPTService();

    @Test
    void testCallTest() throws GPTKeyException {
        assertDoesNotThrow(gptService::testCall);
    }
}