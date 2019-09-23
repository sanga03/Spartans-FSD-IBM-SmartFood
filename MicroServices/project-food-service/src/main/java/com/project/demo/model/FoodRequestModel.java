package com.project.demo.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequestModel {
	
   private String image;//stores link of the image
	
	private String name;
	
	private List<String> category;
	
	private String rUid;//dummy restaurant id	

}
