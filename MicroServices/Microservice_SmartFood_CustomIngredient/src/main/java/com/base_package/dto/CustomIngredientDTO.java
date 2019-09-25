package com.base_package.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomIngredientDTO {
	
	private String uuid;
	private Double amount;
	private String customFoodDetailId;
	private String basicIngredientId;
}
