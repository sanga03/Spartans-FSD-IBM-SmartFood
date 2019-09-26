package com.base_package.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.CustomerPhysicalResponseModel;

@FeignClient(name = "customer-physical")
public interface CustomerPhysicalFeignClient {

	@RequestMapping(value = "/physicalDetails/{uuid}", method = RequestMethod.GET)
	public CustomerPhysicalResponseModel readCustomerPhysicalByUuid(@PathVariable("uuid") String uuid);

}
