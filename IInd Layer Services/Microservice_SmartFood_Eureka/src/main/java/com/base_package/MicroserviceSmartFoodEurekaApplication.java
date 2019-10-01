package com.base_package;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class MicroserviceSmartFoodEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceSmartFoodEurekaApplication.class, args);
	}

}
