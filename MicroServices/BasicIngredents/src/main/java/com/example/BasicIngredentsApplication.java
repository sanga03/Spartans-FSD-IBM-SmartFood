package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

import com.example.Controller.BasciController;

@SpringBootApplication
@EnableDiscoveryClient
//@ComponentScan(basePackageClasses =BasciController.class)
public class BasicIngredentsApplication {
	public static void main(String[] args) {
		SpringApplication.run(BasicIngredentsApplication.class, args);
	}

}
