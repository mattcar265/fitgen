package com.fitgen.rest.repository;

import com.fitgen.rest.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}