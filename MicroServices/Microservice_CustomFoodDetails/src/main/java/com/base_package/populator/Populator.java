package com.base_package.populator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.base_package.entity.CustomFoodDetail;
import com.base_package.entity.Food;
import com.base_package.entity.Restaurant;
import com.base_package.repository.CustomFoodDetailRepository;
import com.base_package.repository.FoodRepository;
import com.base_package.repository.RestaurantRepository;

@Component
public class Populator implements ApplicationListener<ContextRefreshedEvent>{

	@Autowired
	private CustomFoodDetailRepository customFoodDetailRepository;
	@Autowired
	private FoodRepository foodRepository;
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	private CustomFoodDetail customFoodDetail;
	private Food food;
	private Restaurant restaurant;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		populate();
	}

	private void populate() {
		customFoodDetail = new CustomFoodDetail("quantity gms","imageLink",123.45,10);
		food = new Food("food");
		restaurant = new Restaurant("restaurant1");
		restaurant.getFoods().add(food);
		food.getRestaurants().add(restaurant);
		restaurantRepository.save(restaurant);
		foodRepository.save(food);
		customFoodDetail.setFood(food);
		customFoodDetail.setRestaurant(restaurant);
		customFoodDetailRepository.save(customFoodDetail);
		
		customFoodDetail = new CustomFoodDetail("quantity kgs","imageLink2",12333.45,5);
		food = new Food("foodasdas");
		restaurant = new Restaurant("restaurant1asda");
		restaurant.getFoods().add(food);
		food.getRestaurants().add(restaurant);
		restaurantRepository.save(restaurant);
		foodRepository.save(food);
		customFoodDetail.setFood(food);
		customFoodDetail.setRestaurant(restaurant);
		customFoodDetailRepository.save(customFoodDetail);
	}

}
