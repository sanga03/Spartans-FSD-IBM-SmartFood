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
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.models.*;

@RequestMapping("/food")
@FeignClient("food-service")

public interface FoodInterface {

    @PostMapping("/newFood")
	public FoodResponseModel createNewFood(@RequestBody FoodRequestModel foodRequestModel);
	@GetMapping("/allFoods")
	public List<FoodResponseModel> getAllFoods();

	@GetMapping("/id/{fUid}")
	public FoodResponseModel getFoodById(@PathVariable("fUid") String fUid);

	@PutMapping("/update/{fUid}")
	public FoodResponseModel updateFoodById(@RequestBody FoodRequestModel foodRequestModel,
			@PathVariable("fUid") String fUid);

	@DeleteMapping("/delete/{fUid}")
	public FoodResponseModel deleteFoodById(@PathVariable("fUid") String fUid);

	@GetMapping("/cuisine/{cuisine}")
	public List<FoodResponseModel> findFoodByCuisine(@PathVariable("cuisine") String cuisine);

	@GetMapping("/category/{category}")
	public List<FoodResponseModel> findFoodByCategory(@PathVariable("category") Boolean category);

	@GetMapping("/name/{name}")
	public List<FoodResponseModel> findFoodByName(@PathVariable("name") String name);
	}
