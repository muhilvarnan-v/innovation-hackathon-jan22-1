package com.example.ondc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan({"com.example", "org.kie"})
public class OndcApplication {

    public static void main(String[] args) {
        SpringApplication.run(OndcApplication.class, args);
    }

}
