package com.fitgen.rest.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class Exercise {
    @Id
    private String exerciseId;
    private String exerciseName;
    private int duration;
    private String instructions;
    private int sets;
    private int reps;
}
