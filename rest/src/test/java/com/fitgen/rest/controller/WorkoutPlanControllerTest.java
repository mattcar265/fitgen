package com.fitgen.rest.controller;

import com.fitgen.rest.model.WorkoutPlanForm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;


@ExtendWith(MockitoExtension.class)
public class WorkoutPlanControllerTest {

    @InjectMocks
    private WorkoutPlanController workoutPlanController;

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
}