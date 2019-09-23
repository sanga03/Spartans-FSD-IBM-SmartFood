package com.example.demo.bootstrap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Food;
import com.example.demo.entity.Restaurant;
import com.example.demo.repository.FoodRepository;
import com.example.demo.repository.RestaurantRepository;

@Component
public class DevJpaBootstrap implements ApplicationListener<ContextRefreshedEvent> {

	private RestaurantRepository restaurantRepository;
	private FoodRepository foodRepository;
	
	@Autowired
	public DevJpaBootstrap(RestaurantRepository restaurantRepository, FoodRepository foodRepository) {
		super();
		this.restaurantRepository = restaurantRepository;
		this.foodRepository = foodRepository;
	}


	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		init();
	}

	private void init() {

		// ABC
		Restaurant abc = new Restaurant("abc", 1234, 5);
		Food f = new Food(1l, "Pasta");
		abc.getFoods().add(f);
		f.getRestaurants().add(abc);
		restaurantRepository.save(abc);
		foodRepository.save(f);

		// XYZ
		Restaurant xyz = new Restaurant("xyz", 4321, 4);
		Food fo = new Food(2l, "Chocolava");
		xyz.getFoods().add(fo);
		fo.getRestaurants().add(xyz);
		restaurantRepository.save(xyz);
		foodRepository.save(f);

	}

}