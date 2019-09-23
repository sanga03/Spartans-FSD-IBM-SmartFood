package com.example.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Food;

@Repository
public interface FoodRepository extends CrudRepository<Food, Long> {

}
