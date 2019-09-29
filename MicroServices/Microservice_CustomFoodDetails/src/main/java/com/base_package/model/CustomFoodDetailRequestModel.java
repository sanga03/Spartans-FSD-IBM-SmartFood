package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomFoodDetailRequestModel {
	private String quantity;
	private String imageLink;
	private Double price;
	private Float rating;
	private String foodUuid;
	private String restaurantUuid;
}
