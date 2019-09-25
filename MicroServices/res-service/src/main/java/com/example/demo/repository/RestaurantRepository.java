package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

	public Optional<Restaurant> findByResId(String resId);
	public Optional<Restaurant> findByName(String name);
	//public Optional<Restaurant> findByLocation(String location);
	public List<Restaurant> findAllByLocation(String location);
	public List<Restaurant> findAllByName(String name);
	public List<Restaurant> findAllByRating(double rating);
}
