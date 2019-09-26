package com.mycompany.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mycompany.entity.Food;

@Repository
public interface FoodRepository  extends JpaRepository<Food, Integer> {
	
	public Optional<Food> deleteByFUid(String foodId);
@Query("from Food where fUid=:uorderIds")
	public List<Food> findAllByUorderId(@Param("uorderIds") String fUid);
}
