package com.spartans.base.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spartans.base.Entity.UserPreferences;

@Repository
public interface UserPrefRepo extends JpaRepository<UserPreferences, Integer>{
//	@Query("select cuisines from UserPreferences u inner join u.cuisines where u.uUuid=:id")
//	public List<UserPreferences> findAllCusines(@Param("id") String id);
	@Query("select id from UserPreferences where uUuid=:uUuid ")
	public int findId(@Param("uUuid") String uUuid);
}
