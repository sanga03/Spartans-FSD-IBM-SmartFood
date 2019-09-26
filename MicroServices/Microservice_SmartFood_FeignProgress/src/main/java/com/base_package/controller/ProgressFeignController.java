package com.base_package.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base_package.feignClient.BasicIngredientFeignClient;
import com.base_package.feignClient.CustomFoodFeignClient;
import com.base_package.feignClient.CustomIngredientFeignClient;
import com.base_package.feignClient.CustomerOrdersFeignClient;
import com.base_package.feignClient.CustomerPhysicalFeignClient;
import com.base_package.feignClient.CustomerPreferencesFeignClient;
import com.base_package.feignClient.CustomerTrackFeignClient;
import com.base_package.feignClient.FoodFeignClient;
import com.base_package.feignClient.RestaurantFeignClient;
import com.base_package.model.BasicIngredientResponseModel;
import com.base_package.model.CustomFoodDetailsResponseModel;
import com.base_package.model.CustomIngredientResponseModel;
import com.base_package.model.CustomerOrdersResponseModel;
import com.base_package.model.CustomerPhysicalResponseModel;
import com.base_package.model.CustomerPreferencesResponseModel;
import com.base_package.model.CustomerTrackResponseModel;
import com.base_package.model.FoodResponseModel;
import com.base_package.model.PersonalFoodResponseModel;
import com.base_package.model.RestaurantResponseModel;

@RestController
@CrossOrigin
@RequestMapping("/")
public class ProgressFeignController {

	@Autowired private CustomerPhysicalFeignClient customerPhysicalFeignClient;
	@Autowired private CustomerTrackFeignClient customerTrackFeignClient;
	@Autowired private CustomerPreferencesFeignClient customerPreferencesFeignClient;
	@Autowired private CustomerOrdersFeignClient customerOrdersFeignClient;
	@Autowired private RestaurantFeignClient restaurantFeignClient;
	@Autowired private FoodFeignClient foodFeignClient;
	@Autowired private CustomFoodFeignClient customFoodFeignClient;
	@Autowired private CustomIngredientFeignClient customIngredientFeignClient;
	@Autowired private BasicIngredientFeignClient basicIngredientFeignClient;
	
	@GetMapping("/testTrack/{uuid}")
	public CustomerTrackResponseModel testTrack(@PathVariable("uuid") String uuid) {
		return customerTrackFeignClient.readCustomerTrackByCustomerAccountUuid(uuid);
	}
	@GetMapping("/testPhysical/{uuid}")
	public CustomerPhysicalResponseModel testPhysical(@PathVariable("uuid") String uuid) {
		return customerPhysicalFeignClient.readCustomerPhysicalByUuid(uuid);
		
	}@GetMapping("/testPreferences/{uuid}")
	public CustomerPreferencesResponseModel testPreferences(@PathVariable("uuid") String uuid) {
		return customerPreferencesFeignClient.getPreferencesOfCustomer(uuid);
	}
	
	@GetMapping("/testOrders/{uuid}")
	public CustomerOrdersResponseModel testOrders(@PathVariable("uuid") String uuid) {
		return customerOrdersFeignClient.findOrderByUuid(uuid);
	}
	
	@GetMapping("/testRestaurant/{uuid}")
	public RestaurantResponseModel testRestaurant(@PathVariable("uuid") String uuid) {
		return restaurantFeignClient.getRestaurantByUuid(uuid);
	}
	@GetMapping("/testFood/{uuid}")
	public FoodResponseModel testFood(@PathVariable("uuid") String uuid) {
		return foodFeignClient.getFoodByUuid(uuid);
	}
	@GetMapping("/testCustomFood/{uuid}")
	public CustomFoodDetailsResponseModel testCustomFood(@PathVariable("uuid") String uuid) {
		return customFoodFeignClient.getCustomFoodDetailsByUuid(uuid);
	}
	@GetMapping("/testCustomIngredient/{uuid}")
	public CustomIngredientResponseModel testCustomIngredient(@PathVariable("uuid") String uuid) {
		return customIngredientFeignClient.getCustomIngredientByUuid(uuid);
	}
	@GetMapping("/testBasicIngredient/{uuid}")
	public BasicIngredientResponseModel testBasicIngredient(@PathVariable("uuid") String uuid) {
		return basicIngredientFeignClient.readBasicIngredientByUuid(uuid);
	}
	
	
	
	@GetMapping("/getPersonalFoods/{uuid}")
	public ResponseEntity<List<PersonalFoodResponseModel>> getPersonalFoods(@PathVariable("uuid") String uuid){
		
		
		return null;
	}

}
