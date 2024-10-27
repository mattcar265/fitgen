package com.fitgen.rest.service;

import com.fitgen.rest.exception.GPTKeyException;
import com.fitgen.rest.model.WorkoutPlan;
import com.fitgen.rest.repository.WorkoutPlanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class GPTServiceTest {

    @Mock
    WorkoutPlanRepository workoutPlanRepository;

    @InjectMocks
    GPTService gptService = new GPTService();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCallTest() throws GPTKeyException {
        assertDoesNotThrow(gptService::testCall);
    }

    @Test
    void storeWorkoutPlanTest() throws Exception {
        String responseBody = """
            {
              "choices": [
                {
                  "message": {
                    "content": "{\\"planName\\":\\"Monday Chest Day\\",\\"notes\\":\\"Test workout notes\\" ,\\"exercises\\":[{\\"exerciseName\\":\\"Bench\\",\\"duration\\":null,\\"instructions\\":\\"Lock shoulders\\",\\"sets\\":3,\\"reps\\":12}]}"
                  }
                }
              ]
            }
        """;

        WorkoutPlan mockedWorkoutPlan = new WorkoutPlan();
        mockedWorkoutPlan.setPlanId("1234");
        when(workoutPlanRepository.save(any(WorkoutPlan.class))).thenReturn(mockedWorkoutPlan);
        String methodResponse = gptService.storeWorkoutPlan(responseBody, "66f9f4d4f72b94170b26f1a1");

        assertEquals("1234", methodResponse);
    }
}