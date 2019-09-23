package com.project.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.demo.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food,Long> {
	
	Food findByFUid(String foodId);

}
