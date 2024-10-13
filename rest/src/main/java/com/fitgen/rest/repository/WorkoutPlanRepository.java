package com.fitgen.rest.repository;

import com.fitgen.rest.model.WorkoutPlan;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan, String> {
}
