package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
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
import com.example.demo.entity.Food;
import com.example.demo.entity.Restaurant;
import com.example.demo.model.RequestModel;
import com.example.demo.model.ResponseModel;
import com.example.demo.service.RestaurantService;



@RestController
public class RestaurantController {

	@Autowired
	private RestaurantService service;
	
	@PostMapping("/restaurants")
	public ResponseEntity<ResponseModel> createRestaurant(@RequestBody RequestModel restaurantDetail){
		ModelMapper mapper = new ModelMapper();
		Food food = new Food(23l,"jsi");
		RestaurantDto dto = mapper.map(restaurantDetail, RestaurantDto.class);
		dto.getFoods().add(food);
		RestaurantDto dto1 = service.createRestaurant(dto);
		ResponseModel restaurant = mapper.map(dto1, ResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(restaurant);
	
	}
	
	@GetMapping("/restaurants")
	public List<ResponseEntity<ResponseModel>> getRestaurants(){
		List<Restaurant> restaurants = service.getAllRestaurants();
		List<ResponseEntity<ResponseModel>> list = new ArrayList<ResponseEntity<ResponseModel>>();
		ModelMapper mapper = new ModelMapper();
		for(Restaurant r : restaurants) {
			ResponseModel res = mapper.map(r, ResponseModel.class);
			list.add(ResponseEntity.status(HttpStatus.CREATED).body(res));
		}
		return list;
	}
	
	@GetMapping("/restaurants/{id}")
	public ResponseEntity<ResponseModel> findRestaurant(@PathVariable("id") String resID){
		ModelMapper mapper = new ModelMapper();
		Restaurant restaurant = service.findRestaurant(resID);
		ResponseModel model = mapper.map(restaurant, ResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(model);
		
	}
	
	@DeleteMapping("/restaurants/{id}")
	public ResponseEntity<ResponseModel> deleteRestaurant(@PathVariable("id") String resID){
		ModelMapper mapper = new ModelMapper();
		Restaurant restaurant = service.deleteRestaurant(resID);
		ResponseModel model = mapper.map(restaurant, ResponseModel.class);
		return ResponseEntity.ok(model);	
	} 
	
	@PostMapping("/restaurants/{id}")
	public ResponseEntity<ResponseModel> updateRestaurant(@RequestBody RequestModel restaurantDetail,@PathVariable("id") String resID){
		ModelMapper mapper = new ModelMapper();
		RestaurantDto dto = mapper.map(restaurantDetail, RestaurantDto.class);
		RestaurantDto dto1 = service.updateRestaurant(dto, resID);
		ResponseModel restaurant = mapper.map(dto1, ResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(restaurant);
	
	}
}
