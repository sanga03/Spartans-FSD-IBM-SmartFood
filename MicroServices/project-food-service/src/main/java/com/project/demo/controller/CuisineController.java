package com.project.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.demo.entity.Cuisine;
import com.project.demo.model.CuisineRequestModel;
import com.project.demo.model.CuisineResponseModel;
import com.project.demo.service.CuisineService;


@RequestMapping("/cuisine")
@RestController
public class CuisineController {
	
	@Autowired
	private CuisineService cuisineService;
	
	@Autowired
	private ModelMapper mapper;
	
	@PostMapping("/newCuisine")
	public ResponseEntity<CuisineResponseModel> createNewCuisine(@RequestBody CuisineRequestModel cuisineRequestModel)
	{
		Cuisine cuisine = mapper.map(cuisineRequestModel, Cuisine.class);
		cuisine = cuisineService.createCuisine(cuisine);
		CuisineResponseModel cuisineResponseModel = mapper.map(cuisine,CuisineResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(cuisineResponseModel);
	}
	
	@GetMapping("/allCuisines")
	public ResponseEntity<List<CuisineResponseModel>> getAllCuisines()
	{
		List<Cuisine> cuisines = cuisineService.getAllCuisines();
		List<CuisineResponseModel> response = new ArrayList<CuisineResponseModel>();
		CuisineResponseModel cuisineResponseModel = new CuisineResponseModel();
		for(Cuisine cuisine:cuisines)
		{
			cuisineResponseModel = mapper.map(cuisine,CuisineResponseModel.class);
			response.add(cuisineResponseModel);
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);	
	}
	
	@GetMapping("/cuisine/{id}")
	public ResponseEntity<CuisineResponseModel> getCuisineById(@PathVariable("id") Long id)
	{
		Optional<Cuisine> cuisine = cuisineService.findCuisineById(id);
		CuisineResponseModel cuisineResponseModel = mapper.map(cuisine,CuisineResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(cuisineResponseModel);
	}

}
