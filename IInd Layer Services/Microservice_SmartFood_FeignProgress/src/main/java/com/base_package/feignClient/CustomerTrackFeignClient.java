package com.base_package.feignClient;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.CustomerTrackResponseModel;

@FeignClient(name = "customer-track")
public interface CustomerTrackFeignClient {

	@RequestMapping(value = "/customerTrack/byCustomer/{uuid}", method = RequestMethod.GET)
	public List<CustomerTrackResponseModel> readCustomerTrackByCustomerAccountUuid(@PathVariable("uuid") String uuid);
}
