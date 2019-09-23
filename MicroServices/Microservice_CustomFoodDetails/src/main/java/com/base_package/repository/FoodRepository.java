package com.base_package.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.base_package.entity.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
	@Query("select id from Food where uuid=:uuid")
	public Long customGetIdFromUuid(@Param("uuid") String uuid);
}