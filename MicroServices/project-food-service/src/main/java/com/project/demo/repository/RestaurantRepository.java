package com.project.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.demo.entity.Restuarant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restuarant, Integer>{

}
