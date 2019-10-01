package com.base_package;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = {"com.base_package"})
@EnableHystrix
@EnableHystrixDashboard
public class MicroserviceSmartFoodFeignProgressApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceSmartFoodFeignProgressApplication.class, args);
	}

}
