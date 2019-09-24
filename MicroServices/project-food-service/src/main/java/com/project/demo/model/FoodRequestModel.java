package com.project.demo.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequestModel {
	
   private String image;//stores link of the image
	
   private String name;

   private Boolean category;
   
   private String cuisine;
   
}
