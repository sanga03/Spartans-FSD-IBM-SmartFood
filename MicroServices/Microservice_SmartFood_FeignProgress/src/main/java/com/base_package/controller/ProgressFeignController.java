package com.base_package.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.base_package.model.DefaultFoodResponseModel;
import com.base_package.model.FoodResponseModel;
import com.base_package.model.PersonalFoodResponseModel;
import com.base_package.model.RestaurantResponseModel;
import com.base_package.service.ListFoodsService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

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
	
	private ListFoodsService listFoodsService;
	
	@HystrixCommand(fallbackMethod="fallbackGetPhysical")
	private CustomerPhysicalResponseModel getCustomerPhysicalResponseModel(String uuid) {
		return customerPhysicalFeignClient.readCustomerPhysicalByUuid(uuid);
	}
	@HystrixCommand(fallbackMethod="fallbackGetPreference")
	private CustomerPreferencesResponseModel getCustomerPreferencesResponseModel(String uuid) {
		return customerPreferencesFeignClient.getPreferencesOfCustomer(uuid);
	}
	@HystrixCommand(fallbackMethod="fallbackGetOrders")
	private CustomerOrdersResponseModel getCustomerOrdersResponseModel(String uuid) {
		return customerOrdersFeignClient.findOrderByUuid(uuid);
	}
	@HystrixCommand(fallbackMethod="fallbackGetTrack")
	private CustomerTrackResponseModel getCustomerTrackResponseModel(String uuid) {
		return customerTrackFeignClient.readCustomerTrackByCustomerAccountUuid(uuid);
	}
	
	public CustomerPhysicalResponseModel fallbackGetPhysical() {
		return null;
		//return "Physical detail fallback";
	}
	public CustomerPreferencesResponseModel fallbackGetPreference() {
		return null;
		//return "Preference fallback";
	}
	public CustomerOrdersResponseModel fallbackGetOrders() {
		return null;
		//return "Orders fallback";
	}
	public CustomerTrackResponseModel fallbackGetTrack() {
		return null;
		//return "Track fallback";
	}
	
	@GetMapping("/getPersonalFoods/{uuid}/{coordinates}")
	public ResponseEntity<List<PersonalFoodResponseModel>> getPersonalFoods(@PathVariable("uuid") String uuid,@PathVariable("coordinates") String coordinates){
		
		listFoodsService = new ListFoodsService();
		
		List<FoodResponseModel> foodList = foodFeignClient.getAllFoods();
		List<CustomFoodDetailsResponseModel> customFoodList = customFoodFeignClient.getAllCustomFoodDetails();
		List<CustomIngredientResponseModel> customIngredientList = customIngredientFeignClient.getAllCustomIngredients();
		List<BasicIngredientResponseModel> basicIngredientList = basicIngredientFeignClient.readAllBasicIngredients();
		List<RestaurantResponseModel> restaurantList = restaurantFeignClient.getAllRestaurants();
		
		CustomerPhysicalResponseModel customerPhysicalResponseModel = getCustomerPhysicalResponseModel(uuid);
		CustomerPreferencesResponseModel customerPreferencesResponseModel = getCustomerPreferencesResponseModel(uuid);
		CustomerOrdersResponseModel customerOrdersResponseModel;
		try {
			customerOrdersResponseModel = getCustomerOrdersResponseModel(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			customerOrdersResponseModel = null;
		}
		CustomerTrackResponseModel customerTrackResponseModel;
		try {
			customerTrackResponseModel = getCustomerTrackResponseModel(uuid);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			customerTrackResponseModel = null;
		}
		
		List<PersonalFoodResponseModel> list = 	listFoodsService.getPersonalFoods(foodList,customFoodList,customIngredientList,basicIngredientList,restaurantList,customerPhysicalResponseModel,customerPreferencesResponseModel,customerOrdersResponseModel,customerTrackResponseModel,coordinates);
		
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	
	@GetMapping("/getDefaultFoods")
	public ResponseEntity<List<DefaultFoodResponseModel>> getDefaultFoods(){
		
		listFoodsService = new ListFoodsService();
		
		List<FoodResponseModel> foodList = foodFeignClient.getAllFoods();
		List<CustomFoodDetailsResponseModel> customFoodList = customFoodFeignClient.getAllCustomFoodDetails();
		List<CustomIngredientResponseModel> customIngredientList = customIngredientFeignClient.getAllCustomIngredients();
		List<BasicIngredientResponseModel> basicIngredientList = basicIngredientFeignClient.readAllBasicIngredients();
		List<DefaultFoodResponseModel> list = listFoodsService.getDefaultFoods(foodList,customFoodList,customIngredientList,basicIngredientList);
		
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	
	
	
	/*@GetMapping("/testTrack/{uuid}")
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
	}*/

}
