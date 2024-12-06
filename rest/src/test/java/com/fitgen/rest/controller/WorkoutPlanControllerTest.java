package com.fitgen.rest.controller;

import com.fitgen.rest.exception.GPTKeyException;
import com.fitgen.rest.model.User;
import com.fitgen.rest.model.WorkoutPlan;
import com.fitgen.rest.model.WorkoutPlanForm;
import com.fitgen.rest.repository.UserRepository;
import com.fitgen.rest.repository.WorkoutPlanRepository;
import com.fitgen.rest.service.GPTService;
import com.fitgen.rest.util.JwtUtil;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class WorkoutPlanControllerTest {

    @InjectMocks
    private WorkoutPlanController workoutPlanController;

    @Mock
    WorkoutPlanRepository workoutPlanRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    GPTService gptService;

    @Mock
    JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void WorkoutFormTest() {
        WorkoutPlanForm workoutPlanForm1 = new WorkoutPlanForm("chest day", "60", "light weights");
        WorkoutPlanForm workoutPlanForm2 = new WorkoutPlanForm("", "", "light weights");
        WorkoutPlanForm workoutPlanForm3 = new WorkoutPlanForm("", "", "");

        boolean result1 = workoutPlanController.validateWorkoutPlanForm(workoutPlanForm1.getPlanName(), workoutPlanForm1.getDuration(), workoutPlanForm1.getType());
        boolean result2 = workoutPlanController.validateWorkoutPlanForm(workoutPlanForm2.getPlanName(), workoutPlanForm2.getDuration(), workoutPlanForm2.getType());
        boolean result3 = workoutPlanController.validateWorkoutPlanForm(workoutPlanForm3.getPlanName(), workoutPlanForm3.getDuration(), workoutPlanForm3.getType());

        assertTrue(result1);
        assertTrue(result2);
        assertFalse(result3);
    }

    @Test
    void getWorkoutPlanByIdTest() {
        WorkoutPlan mockWorkoutPlan = new WorkoutPlan();
        mockWorkoutPlan.setPlanId("12345");
        mockWorkoutPlan.setPlanName("Test Plan");

        when(workoutPlanRepository.findById(mockWorkoutPlan.getPlanId())).thenReturn(Optional.of(mockWorkoutPlan));
        ResponseEntity<WorkoutPlan> response = workoutPlanController.getWorkoutPlanById(mockWorkoutPlan.getPlanId());

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void getWorkoutPlanByIdNotFoundTest() {
        WorkoutPlan mockWorkoutPlan = new WorkoutPlan();
        mockWorkoutPlan.setPlanId("12345");
        mockWorkoutPlan.setPlanName("Test Plan");

        when(workoutPlanRepository.findById(mockWorkoutPlan.getPlanId())).thenReturn(Optional.empty());
        ResponseEntity<WorkoutPlan> response = workoutPlanController.getWorkoutPlanById(mockWorkoutPlan.getPlanId());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void updateWorkoutPlanByIdTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "123456789123456789123456";
        ObjectId userId = new ObjectId(userIdString);
        String planId = "planId";

        String workoutPlanJson = """
                {
                    "planId": "planId",
                    "planName": "Updated Plan Name",
                    "notes": "Updated Notes",
                    "exercises": []
                }
                """;

        WorkoutPlan existingPlan = new WorkoutPlan();
        existingPlan.setPlanId(planId);
        existingPlan.setPlanName("Old Name");
        existingPlan.setNotes("Old Notes");
        existingPlan.setCreationDate(new Date());
        existingPlan.setUserId(userId);

        Mockito.lenient().when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(workoutPlanRepository.findById(planId)).thenReturn(Optional.of(existingPlan));
        when(workoutPlanRepository.save(any(WorkoutPlan.class))).thenReturn(existingPlan);

        ResponseEntity<String> response = workoutPlanController.updateWorkoutPlanById(authHeader, planId, workoutPlanJson);

        assertEquals("finished updating", response.getBody());
        assertEquals("Updated Plan Name", existingPlan.getPlanName());
        assertEquals("Updated Notes", existingPlan.getNotes());
    }

    @Test
    void updateWorkoutPlanByIdNoExistingWorkoutTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "123456789123456789123456";
        ObjectId userId = new ObjectId(userIdString);
        String planId = "planId";

        String workoutPlanJson = """
                {
                    "planId": "planId",
                    "planName": "Updated Plan Name",
                    "notes": "Updated Notes",
                    "exercises": []
                }
                """;

        WorkoutPlan existingPlan = new WorkoutPlan();
        existingPlan.setPlanId(planId);
        existingPlan.setPlanName("Old Name");
        existingPlan.setNotes("Old Notes");
        existingPlan.setCreationDate(new Date());
        existingPlan.setUserId(userId);

        Mockito.lenient().when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(workoutPlanRepository.findById(planId)).thenReturn(Optional.empty());

        ResponseEntity<String> response = workoutPlanController.updateWorkoutPlanById(authHeader, planId, workoutPlanJson);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Workout plan not found", response.getBody());

    }

    @Test
    void fetchSuggestedPlanTest() throws Exception {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "123456789123456789123456";
        String suggestedPlanId = "suggestedPlanId";

        User mockUser = new User();
        mockUser.setUserId(userIdString);

        WorkoutPlan mockWorkoutPlan = new WorkoutPlan();
        mockWorkoutPlan.setPlanId(suggestedPlanId);
        mockWorkoutPlan.setPlanName("Bench Press Day for Chest Goals");
        mockWorkoutPlan.setNotes("Lock shoulder back throughout each press workout");

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.of(mockUser));
        when(gptService.getSuggestedPlan(userIdString, mockUser)).thenReturn(suggestedPlanId);
        when(workoutPlanRepository.findById(suggestedPlanId)).thenReturn(Optional.of(mockWorkoutPlan));

        ResponseEntity<WorkoutPlan> response = workoutPlanController.fetchSuggestedPlan(authHeader);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void fetchSuggestedPlanNonExistentUserTest() {
        String authHeader = "Bearer sampleJWT";
        String jwt = "sampleJWT";
        String userIdString = "123456789123456789123456";

        when(jwtUtil.extractUserId(jwt)).thenReturn(userIdString);
        when(userRepository.findById(userIdString)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            workoutPlanController.fetchSuggestedPlan(authHeader);
        });
    }
}