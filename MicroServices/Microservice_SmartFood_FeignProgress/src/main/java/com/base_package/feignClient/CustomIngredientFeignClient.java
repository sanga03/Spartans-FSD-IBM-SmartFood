package com.base_package.feignClient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.CustomIngredientResponseModel;

@FeignClient(name = "custom-ingredient-service")
public interface CustomIngredientFeignClient {
	
	@RequestMapping(value = "/customIngredients/{uuid}", method = RequestMethod.GET)
	public CustomIngredientResponseModel getCustomIngredientByUuid(@PathVariable("uuid") String uuid);
	
	@RequestMapping(value = "/customIngredients", method = RequestMethod.GET)
	public List<CustomIngredientResponseModel> getAllCustomIngredients();
}
