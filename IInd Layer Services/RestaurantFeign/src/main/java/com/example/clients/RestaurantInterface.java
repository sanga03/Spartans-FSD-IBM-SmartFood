package com.example.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.models.*;

@FeignClient("restaurant-ws")
public interface RestaurantInterface {

	// Create
		@PostMapping("/createRestaurant")
		public ResponseEntity<ResponseModel> createRestaurant(@RequestBody RequestModel restaurantDetail);

		// Update by ID
		@PutMapping("/restaurants/{id}")
		public ResponseEntity<ResponseModel> updateRestaurant(@RequestBody RequestModel restaurantDetail,
				@PathVariable("id") String resID);

		// Display all restaurants
		@GetMapping("/restaurants")
		public List<ResponseModel> getRestaurants();

		// Find by ID
		@GetMapping("/restaurantid/{id}")
		public ResponseModel findRestaurant(@PathVariable("id") String resID);

		// Delete by ID
		@DeleteMapping("/restaurants/{id}")
		public ResponseEntity<ResponseModel> deleteRestaurant(@PathVariable("id") String resID);

		// find all by name
		@GetMapping("allname/{name}")
		public List<ResponseModel> findAllByName(@PathVariable("name") String name);

		// Display all by location
		@GetMapping("alllocation/{location}")
		public List<ResponseModel> findResByLocation(@PathVariable("location") String location);

		// find all by rating
		@GetMapping("allrating/{rating}")
		public List<ResponseModel> findAllResByRating(@PathVariable("rating") double rating);

		// Display by name
		@GetMapping("restaurantname/{name}")
		public ResponseModel findResByName(@PathVariable("name") String name);

	}

