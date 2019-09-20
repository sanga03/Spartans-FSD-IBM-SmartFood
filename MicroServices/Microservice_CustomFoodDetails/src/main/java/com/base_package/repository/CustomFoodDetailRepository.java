package com.base_package.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.base_package.entity.CustomFoodDetail;

@Repository
public interface CustomFoodDetailRepository extends JpaRepository<CustomFoodDetail, Long>{

}
