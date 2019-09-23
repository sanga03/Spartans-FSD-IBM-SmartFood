package com.project.demo.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodDTO {
	private int id;
	
	private String fUid;//generated randomly 
	
	private String image;//stores link of the image
	
	private String name;
	
	private Set<String> category;
	
	private String rUid;//dummy restaurant id
}
