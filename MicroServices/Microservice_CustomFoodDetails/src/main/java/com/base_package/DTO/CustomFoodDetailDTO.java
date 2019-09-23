package com.base_package.DTO;

import com.base_package.entity.Food;
import com.base_package.entity.Restaurant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomFoodDetailDTO {
	private String uuid;
	private String quantity;
	private String imageLink;
	private Double price;
	private Integer rating;
	private Food food;
	private Restaurant restaurant;
}
