package com.project.demo.service;

import java.util.ArrayList;
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
	
	public Food deleteFoodByFUid(String foodId)
	{
		Food food = foodRepository.findByFUid(foodId);
		foodRepository.delete(food);
		return food;
	}
	
	public FoodDTO createFood(FoodDTO foodDTO)
	{
		Food food = modelMapper.map(foodDTO, Food.class);
		food.setfUid(UUID.randomUUID().toString());
		foodRepository.save(food);
		foodDTO = modelMapper.map(food,FoodDTO.class);
		return foodDTO;
	}
	
	public List<Food> findFoodByCuisine(String cuisine)
	{
		List<Food> foods = foodRepository.findAll();
		List<Food> selectedFoods = new ArrayList<Food>();
		for(Food food:foods)
		{
			if(food.getCuisine() == cuisine)
				selectedFoods.add(food);
		}
		
		return selectedFoods;
	}
	
	
	public List<Food> findFoodByCategory(Boolean category)
	{
		List<Food> foods = foodRepository.findAll();
		List<Food> selectedFoods = new ArrayList<Food>();
		for(Food food:foods)
		{
			if(food.getCategory() == category)
				selectedFoods.add(food);
		}
		
		return selectedFoods;
	}
	
	public List<Food> findFoodByName(String name)
	{
		List<Food> foods = foodRepository.findAll();
		List<Food> selectedFoods = new ArrayList<Food>();
		for(Food food:foods)
		{
			if(food.getName().equals(name))
				selectedFoods.add(food);
		}
		
		return selectedFoods;
		
	}
	public List<Food> findFoodByRuid(String rUid)
	{
		List<Food> foods = foodRepository.findAll();
		List<Food> selectedFoods = new ArrayList<Food>();
		for(Food food:foods)
		{
			if(food.getrUid().equals(rUid))
				selectedFoods.add(food);
		}
		
		return selectedFoods;
		
	}
}
