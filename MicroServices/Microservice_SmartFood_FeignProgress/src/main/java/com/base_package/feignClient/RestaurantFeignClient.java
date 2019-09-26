package com.base_package.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.RestaurantResponseModel;

@FeignClient(name = "restaurant-ws")
public interface RestaurantFeignClient {
	
	@RequestMapping(value = "/restaurants/{uuid}", method = RequestMethod.GET)
	public RestaurantResponseModel getRestaurantByUuid(@PathVariable("uuid") String uuid);
}
