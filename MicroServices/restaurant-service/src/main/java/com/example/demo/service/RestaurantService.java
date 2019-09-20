package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.RestaurantDto;
import com.example.demo.entity.Restaurant;
import com.example.demo.repository.RestaurantRepository;

@Service
public class RestaurantService {

	private RestaurantRepository restaurantRepository;

	@Autowired
	public RestaurantService(RestaurantRepository restaurantRepository) {
		super();
		this.restaurantRepository = restaurantRepository;
	}

	public RestaurantDto createRestaurant(RestaurantDto restaurantDetail) {
		ModelMapper mapper = new ModelMapper();
		Restaurant restaurant = mapper.map(restaurantDetail, Restaurant.class);
		restaurant.setResId(UUID.randomUUID().toString());
		restaurantRepository.save(restaurant);
		RestaurantDto restaurantdto = mapper.map(restaurant, RestaurantDto.class);
		return restaurantdto;
	}

	public List<Restaurant> getAllRestaurants() {
		List<Restaurant> restaurants = (List<Restaurant>) restaurantRepository.findAll();
		return restaurants;

	}

	public Restaurant findRestaurant(String restaurantId) {
		Restaurant restaurant = restaurantRepository.findByResId(restaurantId);
		return restaurant;
	}

	public Restaurant deleteRestaurant(String restaurantId) {
		Restaurant restaurant = restaurantRepository.findByResId(restaurantId);
		restaurantRepository.delete(restaurant);
		return restaurant;
	}

	public RestaurantDto updateRestaurant(RestaurantDto restaurantDetail, String resId) {
		ModelMapper mapper = new ModelMapper();
		Restaurant restaurant = restaurantRepository.findByResId(resId);
		restaurant.setName(restaurantDetail.getName());
		restaurant.setRating(restaurantDetail.getRating());
		restaurant.setContact(restaurantDetail.getContact());
		restaurantRepository.save(restaurant);
		RestaurantDto restaurantdto = mapper.map(restaurant, RestaurantDto.class);
		return restaurantdto;
	}
}
