package com.base_package.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.base_package.entity.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	@Query("select id from Restaurant where uuid=:uuid")
	public Long customGetIdFromUuid(@Param("uuid") String uuid);
}
