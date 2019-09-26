package com.base_package;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = {"com.base_package"})
public class MicroserviceSmartFoodFeignProgressApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceSmartFoodFeignProgressApplication.class, args);
	}

}
