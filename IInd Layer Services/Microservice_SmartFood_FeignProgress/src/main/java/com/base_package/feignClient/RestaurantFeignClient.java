package com.base_package.feignClient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.RestaurantResponseModel;

@FeignClient(name = "restaurant-ws")
public interface RestaurantFeignClient {
	
	@RequestMapping(value = "/restaurantid/{uuid}", method = RequestMethod.GET)
	public RestaurantResponseModel getRestaurantByUuid(@PathVariable("uuid") String uuid);
	
	@RequestMapping(value = "/restaurants", method = RequestMethod.GET)
	public List<RestaurantResponseModel> getAllRestaurants();
}
