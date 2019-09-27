package com.example.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.models.CustomFoodDetailResponseModel;

@FeignClient("custom-food-details-service")
public interface CustomFoodInterface {
	
		@GetMapping("/customFoodDetails")
		public List<CustomFoodDetailResponseModel> readAll();
	
		@GetMapping("/customFoodDetails/{uuid}")
		public CustomFoodDetailResponseModel readByUuid(@PathVariable("uuid") String uuid);
	
}

