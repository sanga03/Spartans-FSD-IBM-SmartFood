package com.project.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.demo.entity.Cuisine;
import com.project.demo.repository.CuisineRepository;

@Service
public class CuisineService {
	
	@Autowired
	private CuisineRepository cuisineRepository;
	
	public Cuisine findCuisineByName(String name)
	{
		return cuisineRepository.findByName(name);
	}
	
	public Cuisine createCuisine(Cuisine cuisine)
	{
		cuisineRepository.save(cuisine);
		return cuisine;
	}
	
	public String deleteCuisineByName(String name)
	{
		Cuisine cuisine = cuisineRepository.findByName(name);
		cuisineRepository.delete(cuisine);
		return "cuisine"+cuisine.getName()+"has been deleted";
	}
	
	public String updateCuisineByName(String name)
	{
		Cuisine cuisine = cuisineRepository.findByName(name);
		cuisine.setName(name);
		cuisineRepository.save(cuisine);
		return "cuisine details have been updated";
	}
	
	public List<Cuisine> getAllCuisines()
	{
		List<Cuisine> cuisines = new ArrayList<Cuisine>();
		cuisines = cuisineRepository.findAll();
		return cuisines;
	}
	
	public Optional<Cuisine> findCuisineById(Long id)
	{
		Optional<Cuisine> cuisine = cuisineRepository.findById(id);
		return cuisine;
	}
}
