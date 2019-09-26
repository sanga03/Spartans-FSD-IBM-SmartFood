package com.base_package.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.FoodResponseModel;

@FeignClient(name = "food-service")
public interface FoodFeignClient {
	
	@RequestMapping(value = "food/id/{uuid}", method = RequestMethod.GET)
	public FoodResponseModel getFoodByUuid(@PathVariable("uuid") String uuid);
}
