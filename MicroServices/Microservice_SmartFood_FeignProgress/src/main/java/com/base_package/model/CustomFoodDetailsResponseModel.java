package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomFoodDetailsResponseModel {
	
	private String uuid;
    private String quantity;
    private String imageLink;
    private Double price;
    private Float rating;
    private String foodUuid;
    private String restaurantUuid;
}
