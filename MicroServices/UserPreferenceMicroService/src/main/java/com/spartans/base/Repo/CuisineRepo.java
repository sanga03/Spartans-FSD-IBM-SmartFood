package com.spartans.base.Repo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;

public interface CuisineRepo extends JpaRepository<Cuisines, Integer> {
	public List<Cuisines> findAllByUserPreferencesId(int user_preferences_id);

	public Cuisines findTopByOrderByIdDesc();
//	@Query("delete from Cuisines where Cuisines.userPreferences.uUuid=:uUuid")
//	public void deleteByUUuid(@Param("uUuid") String uUuid);
	public void deleteByUserPreferences(UserPreferences userPreferences);
//	@Query("delete from Cuisines where user_preferences_id:uUuid")
//	public void deleteByUUuid(@Param("uUuid") String uUuid);
	@Transactional
	@Modifying
	@Query("delete from Cuisines where uUuid=:uUuid")
	public void deleteAllByUUuid(@Param("uUuid") String uUuid);
	
}
