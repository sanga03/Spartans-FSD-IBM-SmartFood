package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomIngredientResponseModel {
	private String uuid;
	private Double amount;
	private String customFoodDetailId;
	private String basicIngredientId;
}
