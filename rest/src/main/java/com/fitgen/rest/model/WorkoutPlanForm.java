package com.fitgen.rest.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkoutPlanForm {
    private String planName;
    private String duration;
    private String type;

    public WorkoutPlanForm(String planName, String duration, String type) {
        this.planName = planName;
        this.duration = duration;
        this.type = type;
    }
}
