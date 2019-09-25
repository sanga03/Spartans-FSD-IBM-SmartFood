package com.mycompany.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mycompany.entity.Food;

@Repository
public interface FoodRepository  extends JpaRepository<Food, Integer> {
	
	public Optional<Food> deleteByFUid(String foodId);
//	public List<Food> findAllByUorderId(String uorderId);
}
