package com.project.demo.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.demo.dto.FoodDTO;
import com.project.demo.entity.Food;
import com.project.demo.repository.FoodRepository;

@Service
public class FoodService {
	
	@Autowired
	private FoodRepository foodRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public Food findFoodById(String foodId)
	{
		return foodRepository.findByFUid(foodId);
	}
	
	public List<Food> getAllFoods()
	{
		List<Food> foods = (List<Food>) foodRepository.findAll();
		return foods;
	}
	
	public String deleteFoodByFUid(String foodId)
	{
		Food food = foodRepository.findByFUid(foodId);
		foodRepository.delete(food);
		return "food with uniquie id "+foodId+"has been deleted";
	}
	
	public FoodDTO createFood(FoodDTO foodDTO)
	{
		Food food = modelMapper.map(foodDTO, Food.class);
		food.setFUid(UUID.randomUUID().toString());
		foodRepository.save(food);
		foodDTO = modelMapper.map(food,FoodDTO.class);
		return foodDTO;
	}

}
