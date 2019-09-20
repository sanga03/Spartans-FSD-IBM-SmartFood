package com.example.demo.bootstrap;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Food;
import com.example.demo.entity.Restaurant;
import com.example.demo.repository.RestaurantRepository;

@Component
public class DevJpaBootstrap implements ApplicationListener<ContextRefreshedEvent> {

	private RestaurantRepository restaurantRepository;

	public DevJpaBootstrap(RestaurantRepository restaurantRepository) {
		super();
		this.restaurantRepository = restaurantRepository;
	}

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		init();
	}

	private void init() {

		// ABC
		Restaurant abc = new Restaurant("abc", 1234, 5);
		Food f = new Food("Pasta");
		abc.getFoods().add(f);
		f.getRestaurants().add(abc);
		restaurantRepository.save(abc);
		// foodrepository.save(f);

		// XYZ
		Restaurant xyz = new Restaurant("xyz", 4321, 4);
		Food fo = new Food("Chocolava");
		xyz.getFoods().add(fo);
		fo.getRestaurants().add(xyz);
		restaurantRepository.save(xyz);
		//foodrepository.save(f);

	}

}