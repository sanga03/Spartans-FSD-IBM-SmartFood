package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomFoodDetailResponseModel {
	private String uuid;
	private String quantity;
	private String imageLink;
	private Double price;
	private Integer rating;
	private String foodUuid;
	private String restaurantUuid;
}
