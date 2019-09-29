package com.base_package.feignClient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.CustomFoodDetailsResponseModel;

@FeignClient(name = "custom-food-details-service")
public interface CustomFoodFeignClient {
	
	@RequestMapping(value = "/customFoodDetails/{uuid}", method = RequestMethod.GET)
	public CustomFoodDetailsResponseModel getCustomFoodDetailsByUuid(@PathVariable("uuid") String uuid);
	
	@RequestMapping(value = "/customFoodDetails", method = RequestMethod.GET)
	public List<CustomFoodDetailsResponseModel> getAllCustomFoodDetails();
	
}
