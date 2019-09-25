package com.example.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.BasicIng;
@Repository
public interface BasicRepo extends JpaRepository<BasicIng, Integer> {
	public List<BasicIng> findAllByName(String name);
	public List<BasicIng>findAllByBUuid(String bUuid);
}
