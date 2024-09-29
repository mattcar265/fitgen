package com.fitgen.rest;

import com.fitgen.rest.controller.GPTController;
import com.fitgen.rest.exception.GPTKeyException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestApplication {

	public static void main(String[] args) throws GPTKeyException {
		SpringApplication.run(RestApplication.class, args);

		GPTController gptController = new GPTController();
		gptController.testCall();
	}

}
