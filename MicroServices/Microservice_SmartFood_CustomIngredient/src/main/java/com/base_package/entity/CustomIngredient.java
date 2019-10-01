package com.base_package.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.base_package.dto.CustomIngredientDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomIngredient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String uuid;
	private Double amount;
	private String customFoodDetailId;
	private String basicIngredientId;
	
	public CustomIngredient(Double amount) {
		super();
		this.amount = amount;
		this.setUuid("CI_"+UUID.randomUUID().toString());
	}

	public void setDetails(CustomIngredientDTO customIngredientDTO) {
		this.setAmount(customIngredientDTO.getAmount());
		this.setCustomFoodDetailId(customIngredientDTO.getCustomFoodDetailId());
		this.setBasicIngredientId(customIngredientDTO.getBasicIngredientId());
	}
	
}
