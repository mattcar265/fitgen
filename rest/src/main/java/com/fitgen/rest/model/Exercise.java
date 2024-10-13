package com.fitgen.rest.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Exercise {
    private String exerciseName;
    private int duration;
    private String instructions;
    private int sets;
    private int reps;
}
