package com.fitgen.rest.controller;

import com.fitgen.rest.exception.GPTKeyException;
import com.fitgen.rest.model.WorkoutPlan;
import com.fitgen.rest.repository.WorkoutPlanRepository;
import com.fitgen.rest.service.GPTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

// https://www.baeldung.com/gson-string-to-jsonobject#:~:text=Learn%20a%20couple%20of%20methods%20for

@RestController
@RequestMapping("/workout-plans")
public class WorkoutPlanController {

    @Autowired
    private WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    private GPTService gptService;

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutPlan> getWorkoutPlanById(@PathVariable String id) {
        Optional<WorkoutPlan> workoutPlan = workoutPlanRepository.findById(id);

        return workoutPlan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/generate-plan")
    public ResponseEntity<String> generatePlan(@RequestBody Map<String, Object> body) throws GPTKeyException {
        System.out.println("Received workout plan form from frontend:" + body);

        String planName = (String) body.get("planName");
        String duration = (String) body.get("duration");
        String description = (String) body.get("description");

        if(!validateWorkoutPlanForm(planName, duration, description)) {
            return ResponseEntity.badRequest().body("Workout plan form was invalid");
        }

        String workoutPlanId = gptService.generateWorkoutPlan(planName, duration, description);

        return ResponseEntity.ok(workoutPlanId);
    }

    private boolean validateWorkoutPlanForm(String planName, String duration, String description) {
        int nullCount = 0;

        if(Objects.equals(planName, "")) nullCount++;
        if(Objects.equals(duration, "")) nullCount++;
        if(Objects.equals(description, "")) nullCount++;

        return nullCount <= 2;
    }
}
