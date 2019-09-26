package com.base_package.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomFoodDetailDTO {
	private String uuid;
	private String quantity;
	private String imageLink;
	private Double price;
	private Integer rating;
	private String foodUuid;
	private String restaurantUuid;
}
