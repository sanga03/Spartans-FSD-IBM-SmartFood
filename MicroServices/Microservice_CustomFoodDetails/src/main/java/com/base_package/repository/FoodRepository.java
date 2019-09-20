package com.base_package.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.base_package.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {

}
