package com.fitgen.rest.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// https://docs.spring.io/spring-data/mongodb/reference/mongodb/mapping/mapping.html#mapping-usage

@Getter
@Setter
@Document(collection = "users")
public class User {

    @Id
    private String userId;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private int height;
    private int weight;
    private int age;
    private String gender;
    private String primaryGoal;
    private String secondaryGoal;
}
