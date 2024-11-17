package com.fitgen.rest.service;

import com.fitgen.rest.exception.GPTKeyException;
import com.fitgen.rest.model.WorkoutPlan;
import com.fitgen.rest.model.User;
import com.fitgen.rest.repository.UserRepository;
import com.fitgen.rest.repository.WorkoutPlanRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class GPTServiceTest {

    @Mock
    WorkoutPlanRepository workoutPlanRepository;

    @Mock
    UserRepository userRepository;

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

    @Test
    void getUserDetailsTest() throws Exception {
        String userIdString = "66f9f4d4f72b94170b26f1a1";

        User mockedUser = new User();
        mockedUser.setAge(24);
        mockedUser.setHeight(180);
        mockedUser.setWeight(200);
        mockedUser.setGender("Male");
        mockedUser.setPrimaryGoal("Strength");
        mockedUser.setSecondaryGoal("Hit 225 on bench");

        when(userRepository.findById(userIdString)).thenReturn(Optional.of(mockedUser));

        String expectedDetails = "age: 24, height: 180, weight: 200, gender: Male, primary goal: Strength, secondary goal: Hit 225 on bench";
        String actualDetails = gptService.getUserDetails(userIdString);

        assertEquals(expectedDetails, actualDetails);
    }

    @Test
    void getUserDetailsBadIdTest() throws Exception {
        String userIdString = "aBadIdString";

        when(userRepository.findById(userIdString)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            gptService.getUserDetails(userIdString);
        });

        String expectedMessage = "Cannot find user by ID: " + userIdString;
        String actualMessage = exception.getMessage();

        assertEquals(expectedMessage, actualMessage);
    }
}