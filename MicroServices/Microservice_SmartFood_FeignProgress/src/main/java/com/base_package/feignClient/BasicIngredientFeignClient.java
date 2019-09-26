package com.base_package.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.BasicIngredientResponseModel;

@FeignClient(name = "basic-ingredients")
public interface BasicIngredientFeignClient {
	
	@RequestMapping(value = "/getBybUuid/{uuid}", method = RequestMethod.GET)
	public BasicIngredientResponseModel readBasicIngredientByUuid(@PathVariable("uuid") String uuid);

}
