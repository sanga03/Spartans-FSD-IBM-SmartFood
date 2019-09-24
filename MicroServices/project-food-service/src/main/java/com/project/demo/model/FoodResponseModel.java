package com.project.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponseModel {
	
private int id;
	
	private String FUid;//generated randomly 
	
	private String image;//stores link of the image
	
	private String name;
	
	private Boolean category;
	
	private String cuisine;
	
	private String RUid;//dummy restaurant id	

}
