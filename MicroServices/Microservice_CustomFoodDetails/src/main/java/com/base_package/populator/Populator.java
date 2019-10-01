package com.base_package.populator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.base_package.entity.CustomFoodDetail;
import com.base_package.repository.CustomFoodDetailRepository;

@Component
public class Populator implements ApplicationListener<ContextRefreshedEvent>{

	@Autowired
	private CustomFoodDetailRepository customFoodDetailRepository;
	
	private CustomFoodDetail customFoodDetail;

	
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		//populate();
	}

	private void populate() {
		
		customFoodDetail = new CustomFoodDetail("quantity gms","imageLink",123.45,10f);
		customFoodDetail.setFoodUuid("F_EWADSVAEGADSVC");
		customFoodDetail.setRestaurantUuid("R_AFDSGAFBVAFE");
		customFoodDetailRepository.save(customFoodDetail);
		
		customFoodDetail = new CustomFoodDetail("quantit","imageL",123.5,5f);
		customFoodDetail.setFoodUuid("F_EWADSVAEGA");
		customFoodDetail.setRestaurantUuid("R_AFDSGAF");
		customFoodDetailRepository.save(customFoodDetail);
	}

}
