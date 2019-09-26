package com.base_package.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.CustomerOrdersResponseModel;

@FeignClient(name = "customer-order-service")
public interface CustomerOrdersFeignClient {
	
	@RequestMapping(value = "/findByUid/{uuid}", method = RequestMethod.GET)
	public CustomerOrdersResponseModel findOrderByUuid(@PathVariable("uuid") String uuid);
}
