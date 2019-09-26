package com.base_package;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@EnableDiscoveryClient
@EnableZuulProxy
@CrossOrigin
public class MicroserviceSmartFoodZuulApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceSmartFoodZuulApplication.class, args);
	}

}
