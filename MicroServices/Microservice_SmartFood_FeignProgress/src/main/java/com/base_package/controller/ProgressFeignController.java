package com.base_package.controller;

import java.util.ArrayList;
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
import com.base_package.model.ProgressReportResponseModel;
import com.base_package.model.RestaurantResponseModel;
import com.base_package.service.ListFoodsService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;

@CrossOrigin
@RestController
@RequestMapping("/")
public class ProgressFeignController {

	@Autowired
	private CustomerPhysicalFeignClient customerPhysicalFeignClient;
	@Autowired
	private CustomerTrackFeignClient customerTrackFeignClient;
	@Autowired
	private CustomerPreferencesFeignClient customerPreferencesFeignClient;
	@Autowired
	private CustomerOrdersFeignClient customerOrdersFeignClient;
	@Autowired
	private RestaurantFeignClient restaurantFeignClient;
	@Autowired
	private FoodFeignClient foodFeignClient;
	@Autowired
	private CustomFoodFeignClient customFoodFeignClient;
	@Autowired
	private CustomIngredientFeignClient customIngredientFeignClient;
	@Autowired
	private BasicIngredientFeignClient basicIngredientFeignClient;

	@Autowired
	private ListFoodsService listFoodsService;

	@HystrixCommand(fallbackMethod = "fallbackGetPhysical")
	private CustomerPhysicalResponseModel getCustomerPhysicalResponseModel(String uuid) {
		CustomerPhysicalResponseModel customerPhysicalResponseModel = customerPhysicalFeignClient
				.readCustomerPhysicalByUuid(uuid);
		System.out.println("Physical working");
		return customerPhysicalResponseModel;
	}

	@HystrixCommand(fallbackMethod = "fallbackGetPreference")
	private CustomerPreferencesResponseModel getCustomerPreferencesResponseModel(String uuid) {
		return customerPreferencesFeignClient.getPreferencesOfCustomer(uuid);
	}

	@HystrixCommand(fallbackMethod = "fallbackGetOrders")
	private List<CustomerOrdersResponseModel> getCustomerOrdersResponseModel(String uuid) {
		return customerOrdersFeignClient.findOrderByUuid(uuid);
	}

	@HystrixCommand(fallbackMethod = "fallbackGetTrack")
	private List<CustomerTrackResponseModel> getCustomerTrackResponseModel(String uuid) {
		List<CustomerTrackResponseModel> list = customerTrackFeignClient.readCustomerTrackByCustomerAccountUuid(uuid);
		System.out.println("TRACK WORKING");
		return list;
	}

	public CustomerPhysicalResponseModel fallbackGetPreference() {
		System.out.println("CUSTOMER PHYSICAL NOT RUNNING");
		return null;
	}

	public CustomerPreferencesResponseModel fallbackGetPhysical() {
		System.out.println("CUSTOMER PREFERENCES NOT RUNNING");
		return null;
	}

	public ArrayList<CustomerOrdersResponseModel> fallbackGetOrders() {
		System.out.println("CUSTOMER ORDERS NOT RUNNING");
		return new ArrayList<CustomerOrdersResponseModel>();
	}

	public ArrayList<CustomerTrackResponseModel> fallbackGetTrack() {
		System.out.println("CUSTOMER TRACK NOT RUNNING");
		return new ArrayList<CustomerTrackResponseModel>();
	}

	@GetMapping("/getPersonalFoods/{uuid}/{coordinates}")
	public ResponseEntity<List<PersonalFoodResponseModel>> getPersonalFoods(@PathVariable("uuid") String uuid,
			@PathVariable("coordinates") String coordinates) {

		// listFoodsService = new ListFoodsService();

		List<FoodResponseModel> foodList = foodFeignClient.getAllFoods();
		List<CustomFoodDetailsResponseModel> customFoodList = customFoodFeignClient.getAllCustomFoodDetails();
		List<CustomIngredientResponseModel> customIngredientList = customIngredientFeignClient
				.getAllCustomIngredients();
		List<BasicIngredientResponseModel> basicIngredientList = basicIngredientFeignClient.readAllBasicIngredients();
		List<RestaurantResponseModel> restaurantList = restaurantFeignClient.getAllRestaurants();

		CustomerPhysicalResponseModel customerPhysicalResponseModel = getCustomerPhysicalResponseModel(uuid);
		CustomerPreferencesResponseModel customerPreferencesResponseModel = getCustomerPreferencesResponseModel(uuid);
		List<CustomerOrdersResponseModel> customerOrdersResponseModelList;
		try {
			customerOrdersResponseModelList = getCustomerOrdersResponseModel(uuid);
			System.out.println("Got the orders: " + customerOrdersResponseModelList.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			customerOrdersResponseModelList = new ArrayList<CustomerOrdersResponseModel>();
			System.out.println("Caught Exception in Orders");
		}
		List<CustomerTrackResponseModel> customerTrackResponseModelList;
		try {
			customerTrackResponseModelList = getCustomerTrackResponseModel(uuid);
			System.out.println("Got the tracks: " + customerTrackResponseModelList.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			customerTrackResponseModelList = new ArrayList<CustomerTrackResponseModel>();
			System.out.println("Caught Exception in Track");
		}

		List<PersonalFoodResponseModel> list = listFoodsService.getPersonalFoods(foodList, customFoodList,
				customIngredientList, basicIngredientList, restaurantList, customerPhysicalResponseModel,
				customerPreferencesResponseModel, customerOrdersResponseModelList, customerTrackResponseModelList,
				coordinates);

		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@GetMapping("/getProgress/{customerId}")
	public ResponseEntity<List<ProgressReportResponseModel>> getProgress(
			@PathVariable("customerId") String customerId) {

		List<CustomerOrdersResponseModel> customerOrdersResponseModelList = getCustomerOrdersResponseModel(customerId);
		List<CustomerTrackResponseModel> customerTrackResponseModelList = getCustomerTrackResponseModel(customerId);
		CustomerPreferencesResponseModel customerPreferencesResponseModel = getCustomerPreferencesResponseModel(
				customerId);
		CustomerPhysicalResponseModel customerPhysicalResponseModel = getCustomerPhysicalResponseModel(customerId);

		List<CustomFoodDetailsResponseModel> customFoodDetailsResponseModelList = customFoodFeignClient
				.getAllCustomFoodDetails();
		List<CustomIngredientResponseModel> customIngredientResponseModelList = customIngredientFeignClient
				.getAllCustomIngredients();
		List<BasicIngredientResponseModel> basicIngredientResponseModelList = basicIngredientFeignClient
				.readAllBasicIngredients();

		// listFoodsService = new ListFoodsService();
		List<ProgressReportResponseModel> progressReportResponseModelList = listFoodsService.getProgress(
				customerOrdersResponseModelList, customerTrackResponseModelList, customerPreferencesResponseModel,
				customerPhysicalResponseModel, customFoodDetailsResponseModelList, customIngredientResponseModelList,
				basicIngredientResponseModelList);
		return ResponseEntity.status(HttpStatus.OK).body(progressReportResponseModelList);
	}

	@GetMapping("/getDefaultFoods")
	public ResponseEntity<List<DefaultFoodResponseModel>> getDefaultFoods() {

		// listFoodsService = new ListFoodsService();

		List<FoodResponseModel> foodList = foodFeignClient.getAllFoods();
		List<CustomFoodDetailsResponseModel> customFoodList = customFoodFeignClient.getAllCustomFoodDetails();
		List<CustomIngredientResponseModel> customIngredientList = customIngredientFeignClient
				.getAllCustomIngredients();
		List<BasicIngredientResponseModel> basicIngredientList = basicIngredientFeignClient.readAllBasicIngredients();
		List<DefaultFoodResponseModel> list = listFoodsService.getDefaultFoods(foodList, customFoodList,
				customIngredientList, basicIngredientList);

		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
}
