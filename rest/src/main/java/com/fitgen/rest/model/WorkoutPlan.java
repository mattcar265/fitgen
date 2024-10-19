package com.fitgen.rest.model;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Document(collection = "workoutPlans")
public class WorkoutPlan {
    @Id
    private String planId;
    private String planName;
    private String notes;
    private Date creationDate;
    private List<Exercise> exercises;

    private ObjectId userId;
}