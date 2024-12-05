package com.fitgen.rest.repository;

import com.fitgen.rest.model.WorkoutPlan;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutPlanRepository extends MongoRepository<WorkoutPlan, String> {
    List<WorkoutPlan> findByUserId(ObjectId userId);
    List<WorkoutPlan> findTop10ByOrderByLikesDesc();
}
