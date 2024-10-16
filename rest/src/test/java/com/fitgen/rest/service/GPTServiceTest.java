package com.fitgen.rest.service;

import com.fitgen.rest.exception.GPTKeyException;
import com.fitgen.rest.service.GPTService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class GPTServiceTest {

    GPTService gptService = new GPTService();

    @Test
    void testCallTest() throws GPTKeyException {
        assertDoesNotThrow(gptService::testCall);
    }
}