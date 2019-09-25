package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.RestaurantDto;
import com.example.demo.entity.Restaurant;
import com.example.demo.repository.RestaurantRepository;

@Service
public class RestaurantService {

	@Autowired
	private RestaurantRepository restaurantRepository;

	public RestaurantService(RestaurantRepository restaurantRepository) {
		super();
		this.restaurantRepository = restaurantRepository;
	}

	// Create
	public RestaurantDto createRestaurant(RestaurantDto restaurantDetail) {
		ModelMapper mapper = new ModelMapper();
		Restaurant restaurant = mapper.map(restaurantDetail, Restaurant.class);
		restaurant.setResId(UUID.randomUUID().toString());
		restaurantRepository.save(restaurant);
		RestaurantDto restaurantdto = mapper.map(restaurant, RestaurantDto.class);
		return restaurantdto;
	}

	// Display all
	public List<Restaurant> getAllRestaurants() {
		List<Restaurant> restaurants = restaurantRepository.findAll();
		return restaurants;

	}

	// Display by ID
	public Restaurant findRestaurant(String resId) {
		Optional<Restaurant> restaurant = restaurantRepository.findByResId(resId);
		if (restaurant.isPresent()) {
			return restaurant.get();
		}
		return null;
	}
	
	// Display by name
		public Restaurant findResByName(String name) {
			Optional<Restaurant> restaurant = restaurantRepository.findByName(name);
			if (restaurant.isPresent()) {
				return restaurant.get();
			}
			return null;
		}
		
	// Display all by location
	public List<Restaurant> findResByLocation(String location) {
		//Optional<Restaurant> restaurant = restaurantRepository.findByLocation(location);
		List<Restaurant> restaurants = (List<Restaurant>)restaurantRepository.findAllByLocation(location);
//		if (restaurants.isPresent()) {
//			return restaurants.get();
//		}
		return restaurants;
	}
		

	// Delete by ID
	public Restaurant deleteRestaurant(String resId) {
		Optional<Restaurant> restaurant = restaurantRepository.findByResId(resId);
		if (restaurant.isPresent()) {
			restaurantRepository.delete(restaurant.get());
		}
		return null;
	}

	// Update by ID
	public RestaurantDto updateRestaurant(RestaurantDto restaurantDetail, String resId) {
		ModelMapper mapper = new ModelMapper();
		Optional<Restaurant> restaurant = restaurantRepository.findByResId(resId);
		if (restaurant.isPresent()) {
			Restaurant tempRestaurant = restaurant.get();
			tempRestaurant.setName(restaurantDetail.getName());
			tempRestaurant.setRating(restaurantDetail.getRating());
			tempRestaurant.setContact(restaurantDetail.getContact());
			restaurantRepository.save(tempRestaurant);
			RestaurantDto restaurantdto = mapper.map(tempRestaurant, RestaurantDto.class);
			return restaurantdto;
		}

		return null;

	}
	
	//find all by name
	public List<Restaurant> findAllResByName(String name) {
		List<Restaurant> restaurants = (List<Restaurant>)restaurantRepository.findAllByName(name);
		return restaurants;
	}
	
	//find all by rating
	public List<Restaurant> findAllResByRating(double rating) {
		List<Restaurant> restaurants = (List<Restaurant>)restaurantRepository.findAllByRating(rating);
		return restaurants;
	}
}
