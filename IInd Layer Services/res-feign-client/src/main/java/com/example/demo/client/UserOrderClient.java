package com.example.demo.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.userordermodel.RequestModel;
import com.example.demo.userordermodel.ResponseModel;

@FeignClient(name="customer-order-service")

public interface UserOrderClient {
	
	
	@RequestMapping(value="/push",method=RequestMethod.POST)
	public boolean addOrder(@RequestBody RequestModel req);
	
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public List<ResponseModel> getAllOrders();
	

	@RequestMapping(value="/listId/{custId}",method=RequestMethod.GET)
	public List<ResponseModel> getAllOrdersbyId(@PathVariable String custId);
	
	
}
