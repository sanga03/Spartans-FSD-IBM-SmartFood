package com.project.demo.controller;

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
	public FoodResponseModel createNewFood(@RequestBody FoodRequestModel foodRequestModel) {
		FoodDTO dto = mapper.map(foodRequestModel, FoodDTO.class);
		dto = foodService.createFood(dto);
		FoodResponseModel foodResponseModel = mapper.map(dto, FoodResponseModel.class);
		return foodResponseModel;
	}

	@GetMapping("/allFoods")
	public List<FoodResponseModel> getAllFoods() {
		List<Food> foods = foodService.getAllFoods();
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return response;
	}

	@GetMapping("/id/{fUid}")
	public FoodResponseModel getFoodById(@PathVariable("fUid") String fUid) {
		Food food = foodService.findFoodById(fUid);
		FoodResponseModel foodResponseModel = mapper.map(food, FoodResponseModel.class);
		return foodResponseModel;
	}

	@PutMapping("/update/{fUid}")
	public FoodResponseModel updateFoodById(@RequestBody FoodRequestModel foodRequestModel,
			@PathVariable("fUid") String fUid) {
		Food food = mapper.map(foodRequestModel, Food.class);
		food = foodService.findFoodById(fUid);
		food.setCategory(foodRequestModel.getCategory());
		food.setName(foodRequestModel.getName());
		food.setImage(foodRequestModel.getImage());
		food.setCuisine(foodRequestModel.getCuisine());
		FoodResponseModel foodResponseModel = mapper.map(food, FoodResponseModel.class);
		return foodResponseModel;
	}

	@DeleteMapping("/delete/{fUid}")
	public FoodResponseModel deleteFoodById(@PathVariable("fUid") String fUid) {
		Food food = foodService.deleteFoodByFUid(fUid);
		FoodResponseModel foodResponseModel = mapper.map(food, FoodResponseModel.class);
		return foodResponseModel;
	}

	@GetMapping("/cuisine/{cuisine}")
	public List<FoodResponseModel> findFoodByCuisine(@PathVariable("cuisine") String cuisine) {
		List<Food> foods = foodService.findFoodByCuisine(cuisine);
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return response;
	}

	@GetMapping("/category/{category}")
	public List<FoodResponseModel> findFoodByCategory(@PathVariable("category") Boolean category) {
		List<Food> foods = foodService.findFoodByCategory(category);
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return response;
	}

	@GetMapping("/name/{name}")
	public List<FoodResponseModel> findFoodByName(@PathVariable("name") String name) {
		List<Food> foods = foodService.findFoodByName(name);
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for (Food food : foods) {
			foodResponseModel = mapper.map(food, FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return response;
	}
}
