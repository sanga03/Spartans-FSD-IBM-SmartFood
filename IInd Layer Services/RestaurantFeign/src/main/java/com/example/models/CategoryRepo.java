package com.example.models;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

	//public List<ResponseModel> findAllByResId(String resId);
	public List<Category> findAllByCategory(int a);
}
