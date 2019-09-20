package com.base_package;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class MicroserviceSmartFoodConfigurationServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceSmartFoodConfigurationServerApplication.class, args);
	}

}
