package com.spartans.base.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spartans.base.Entity.Cuisines;

public interface CuisineRepo extends JpaRepository<Cuisines, Integer> {
public List<Cuisines> findAllByUserPreferencesId(int user_preferences_id);
}
