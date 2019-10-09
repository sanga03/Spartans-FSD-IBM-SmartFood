package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PersonalFoodResponseModel {
	private String customFoodId;
	private String restaurantName;
	private String restaurantId;
	private String customFoodImageLink;
	private Double price;
	private String quantity;
	private Float rating;
	private Double calories;
	private String foodName;
	private String cuisine;
	private boolean category;
	private Integer priority;
	private Float distance;
}
