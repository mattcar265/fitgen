package com.fitgen.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("fitgenproject1@gmail.com");
        message.setTo(to);
        message.setSubject("Welcome to FitGen!");
        message.setText("Thank you for joining FitGen, let's get started on your fitness goals!");
        mailSender.send(message);
    }
}
