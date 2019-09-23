package com.project.demo.populate;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.project.demo.entity.Cuisine;
import com.project.demo.entity.Food;
import com.project.demo.repository.CuisineRepository;
import com.project.demo.repository.FoodRepository;

@Component
public class FoodPopulator implements ApplicationListener<ContextRefreshedEvent> {
	
	@Autowired
	private FoodRepository foodRepository;
	
	@Autowired
	private CuisineRepository cuisineRepository;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		populate();		
	}

	private void populate() {
		// TODO Auto-generated method stub
		
		Cuisine cuisine = new Cuisine("south indian");
		Cuisine cuisine2 = new Cuisine("karnataka style");
		
		Food food = new Food();
		
		food.setFUid(UUID.randomUUID().toString());
		food.setCategory(true);
		food.setName("poori");
		food.setImage("poori.jpeg");
		
		food.getCuisine().add(cuisine);	
		food.getCuisine().add(cuisine2);
			
		foodRepository.save(food);
		cuisineRepository.save(cuisine);
		
	}
}
