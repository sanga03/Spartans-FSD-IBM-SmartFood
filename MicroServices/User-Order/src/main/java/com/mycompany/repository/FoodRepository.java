package com.mycompany.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mycompany.entity.Food;



@Repository
public interface FoodRepository  extends CrudRepository<Food, Long> {

}
