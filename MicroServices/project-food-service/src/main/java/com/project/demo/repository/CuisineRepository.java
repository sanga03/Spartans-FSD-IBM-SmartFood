package com.project.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.demo.entity.Cuisine;

@Repository
public interface CuisineRepository extends JpaRepository<Cuisine,Long> {
	
	Cuisine findByName(String name);

}
