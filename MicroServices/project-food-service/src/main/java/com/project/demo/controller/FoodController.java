package com.project.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.demo.dto.FoodDTO;
import com.project.demo.entity.Food;
import com.project.demo.model.FoodRequestModel;
import com.project.demo.model.FoodResponseModel;
import com.project.demo.service.FoodService;

@RequestMapping("/food")
@RestController
public class FoodController {

	@Autowired
	private FoodService foodService;

	@Autowired
	private ModelMapper mapper;
     
    @PostMapping("/newFood")
	public ResponseEntity<FoodResponseModel> createNewFood(@RequestBody FoodRequestModel foodRequestModel) {
    	mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		FoodDTO dto = mapper.map(foodRequestModel, FoodDTO.class);
		dto = foodService.createFood(dto);
		FoodResponseModel foodResponseModel = mapper.map(dto, FoodResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(foodResponseModel);
	}

	@GetMapping("/allFoods")
	public ResponseEntity<List<FoodResponseModel>> getAllFoods() {
		List<Food> foods = foodService.getAllFoods();
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		 return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/id/{fUid}")
	public ResponseEntity<FoodResponseModel> getFoodById(@PathVariable("fUid") String fUid) {
		Food food = foodService.findFoodById(fUid);
		FoodResponseModel foodResponseModel = mapper.map(food, FoodResponseModel.class);
		 return ResponseEntity.status(HttpStatus.CREATED).body(foodResponseModel);
	}

	@PutMapping("/update/{fUid}")
	public ResponseEntity<FoodResponseModel> updateFoodById(@RequestBody FoodRequestModel foodRequestModel,
			@PathVariable("fUid") String fUid) {
		Food food = mapper.map(foodRequestModel, Food.class);
		food = foodService.findFoodById(fUid);
		food.setCategory(foodRequestModel.getCategory());
		food.setName(foodRequestModel.getName());
		food.setImage(foodRequestModel.getImage());
		food.setCuisine(foodRequestModel.getCuisine());
		FoodResponseModel foodResponseModel = mapper.map(food, FoodResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(foodResponseModel);
	}

	@DeleteMapping("/delete/{fUid}")
	public ResponseEntity<FoodResponseModel> deleteFoodById(@PathVariable("fUid") String fUid) {
		Food food = foodService.deleteFoodByFUid(fUid);
		FoodResponseModel foodResponseModel = mapper.map(food, FoodResponseModel.class);
		return ResponseEntity.status(HttpStatus.GONE).body(foodResponseModel);
	}

	@GetMapping("/cuisine/{cuisine}")
	public ResponseEntity<List<FoodResponseModel>> findFoodByCuisine(@PathVariable("cuisine") String cuisine) {
		List<Food> foods = foodService.findFoodByCuisine(cuisine);
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/category/{category}")
	public ResponseEntity<List<FoodResponseModel>> findFoodByCategory(@PathVariable("category") Boolean category) {
		List<Food> foods = foodService.findFoodByCategory(category);
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/name/{name}")
	public ResponseEntity<List<FoodResponseModel>> findFoodByName(@PathVariable("name") String name) {
		List<Food> foods = foodService.findFoodByName(name);
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping("/restaurant/{rUid}")
	public ResponseEntity<List<FoodResponseModel>> findFoodByRuid(@PathVariable("rUid") String rUid) {
		List<Food> foods = foodService.findFoodByRuid(rUid);
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
}
