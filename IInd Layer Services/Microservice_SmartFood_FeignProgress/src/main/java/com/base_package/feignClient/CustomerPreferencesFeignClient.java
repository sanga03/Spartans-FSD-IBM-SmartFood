package com.base_package.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.base_package.model.CustomerPreferencesResponseModel;

@FeignClient(name = "customer-preference")
public interface CustomerPreferencesFeignClient {
	
	@RequestMapping(value = "/pref/{uuid}", method = RequestMethod.GET)
	public CustomerPreferencesResponseModel getPreferencesOfCustomer(@PathVariable("uuid") String uuid);
}
