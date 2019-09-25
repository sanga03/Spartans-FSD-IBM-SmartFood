package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RestaurantDto;

import com.example.demo.entity.Restaurant;
import com.example.demo.model.RequestModel;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.RestaurantService;

@RestController
public class RestaurantController {

	@Autowired
	private RestaurantService service;

	// Create
	@PostMapping("/createRestaurant")
	public ResponseEntity<ResponseModel> createRestaurant(@RequestBody RequestModel restaurantDetail) {
		ModelMapper mapper = new ModelMapper();
		RestaurantDto dto = mapper.map(restaurantDetail, RestaurantDto.class);
		RestaurantDto dto1 = service.createRestaurant(dto);
		ResponseModel restaurant = mapper.map(dto1, ResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(restaurant);
	}

	// Display all
	@GetMapping("/restaurants")
	public List<ResponseModel> getRestaurants() {
		List<Restaurant> restaurant = service.getAllRestaurants();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		List<ResponseModel> restaurants = new ArrayList<ResponseModel>();
		for(Restaurant r:restaurant)
			restaurants.add(mapper.map(r,ResponseModel.class));
		return restaurants;
	}

	// Display by ID
	@GetMapping("/restaurantid/{id}")
	public ResponseModel findRestaurant(@PathVariable("id") String resID) {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		Restaurant restaurant = service.findRestaurant(resID);
		ResponseModel model = mapper.map(restaurant, ResponseModel.class);
		return (model);

	}
	
	// Display by name
	@GetMapping("restaurantname/{name}")
	public ResponseModel findResByName(@PathVariable("name") String name) {
		ModelMapper mapper = new ModelMapper();
		Restaurant restaurant = service.findResByName(name);
		ResponseModel model = mapper.map(restaurant, ResponseModel.class);
		return (model);
	}
	
	
	
	// Delete by ID
	@DeleteMapping("/restaurants/{id}")
	public ResponseEntity<ResponseModel> deleteRestaurant(@PathVariable("id") String resID) {
		ModelMapper mapper = new ModelMapper();
		Restaurant restaurant = service.deleteRestaurant(resID);
		ResponseModel model = mapper.map(restaurant, ResponseModel.class);
		return ResponseEntity.ok(model);
	}

	// Update by ID
	@PutMapping("/restaurants/{id}")
	public ResponseEntity<ResponseModel> updateRestaurant(@RequestBody RequestModel restaurantDetail,
			@PathVariable("id") String resID) {
		ModelMapper mapper = new ModelMapper();
		RestaurantDto dto = mapper.map(restaurantDetail, RestaurantDto.class);
		RestaurantDto dto1 = service.updateRestaurant(dto, resID);
		ResponseModel restaurant = mapper.map(dto1, ResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(restaurant);

	}
	
	//Display all by location
		@GetMapping("alllocation/{location}")
		public List<ResponseModel> findResByLocation(@PathVariable("location") String location) {
			ModelMapper mapper = new ModelMapper();
			List<Restaurant> restaurant = service.findResByLocation(location);
			List<ResponseModel> res = new ArrayList<ResponseModel>();
			for(Restaurant r:restaurant)
				res.add(mapper.map(r, ResponseModel.class));
				
			return res;
		}
	
	//find all by name
	@GetMapping("allname/{name}")
	public List<ResponseModel> findAllByName(@PathVariable("name") String name) {
		ModelMapper mapper = new ModelMapper();
		List<Restaurant> restaurant = service.findAllResByName(name);
		List<ResponseModel> res = new ArrayList<ResponseModel>();
		for(Restaurant r:restaurant)
			res.add(mapper.map(r, ResponseModel.class));
			
		return res;
	}
	
	//find all by rating
	@GetMapping("allrating/{rating}")
	public List<ResponseModel> findAllResByRating(@PathVariable("rating") double rating)
	{
		ModelMapper mapper = new ModelMapper();
		List<Restaurant> restaurant = service.findAllResByRating(rating);
		List<ResponseModel> res = new ArrayList<ResponseModel>();
		for(Restaurant r:restaurant)
			res.add(mapper.map(r, ResponseModel.class));
			
		return res;
	}
}
