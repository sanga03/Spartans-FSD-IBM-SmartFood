package com.base_package.populator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.base_package.entity.CustomIngredient;
import com.base_package.repository.CustomIngredientRepository;
@Component
public class Populator implements ApplicationListener<ContextRefreshedEvent>{

	@Autowired
	private CustomIngredientRepository customIngredientRepository;
	
	private CustomIngredient customIngredient;
	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		populate();
	}

	private void populate() {
		
		customIngredient = new CustomIngredient(14.32);
		customIngredient.setCustomFoodDetailId("CFD_EWFAQEWCAS");
		customIngredient.setBasicIngredientId("BI_SADFASDF");
		customIngredientRepository.save(customIngredient);
		
		customIngredient = new CustomIngredient(14.3223);
		customIngredient.setCustomFoodDetailId("CFD_sdfaewrkufhnmewads");
		customIngredient.setBasicIngredientId("BI_dsafjakdsf");
		customIngredientRepository.save(customIngredient);
		
	}
}