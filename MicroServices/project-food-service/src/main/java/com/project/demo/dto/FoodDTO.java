package com.project.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodDTO {
	private int id;
	
	private String fUid;//generated randomly 
	
	private String image;//stores link of the image
	
	private String name;
	
	private Boolean category;
	
	private String cuisine; 
	
	private String rUid;//dummy restaurant id
}
