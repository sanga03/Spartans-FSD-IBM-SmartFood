package com.project.demo.model;

import java.util.List;

import com.project.demo.entity.Cuisine;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponseModel {
	
private int id;
	
	private String FUid;//generated randomly 
	
	private String image;//stores link of the image
	
	private String name;
	
	private Boolean category;
	
	private List<Cuisine> cuisine;
	
	private String RUid;//dummy restaurant id	

}
