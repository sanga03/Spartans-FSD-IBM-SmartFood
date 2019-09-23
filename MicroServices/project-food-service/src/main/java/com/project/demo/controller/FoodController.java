package com.project.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public ResponseEntity<FoodResponseModel> createNewFood(@RequestBody FoodRequestModel foodRequestModel)
	{
		FoodDTO dto = mapper.map(foodRequestModel, FoodDTO.class);
		dto = foodService.createFood(dto);
		FoodResponseModel foodResponseModel = mapper.map(dto,FoodResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(foodResponseModel);
	}
	
	@GetMapping("/allFoods")
	public ResponseEntity<List<FoodResponseModel>> getAllFoods()
	{
		List<Food> foods = foodService.getAllFoods();
		List<FoodResponseModel> response = new ArrayList<FoodResponseModel>();
		FoodResponseModel foodResponseModel = new FoodResponseModel();
		for(Food food:foods)
		{
			foodResponseModel = mapper.map(food,FoodResponseModel.class);
			response.add(foodResponseModel);
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);	
	}
	
	@GetMapping("/food/{fUid}")
	public ResponseEntity<FoodResponseModel> getFoodById(@PathVariable("fUid") String fUid)
	{
		Food food = foodService.findFoodById(fUid);
		FoodResponseModel foodResponseModel = mapper.map(food,FoodResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(foodResponseModel);
	}
	
}
