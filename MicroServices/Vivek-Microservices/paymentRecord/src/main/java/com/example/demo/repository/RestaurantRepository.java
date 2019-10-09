package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Restaurant;
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
   
	public Optional<Restaurant> findByResId(String resId);
}
