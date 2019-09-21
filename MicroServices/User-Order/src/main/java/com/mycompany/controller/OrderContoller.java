package com.mycompany.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.mycompany.repository.CustomerRepository;
import com.mycompany.repository.FoodRepository;
import com.mycompany.repository.OrderRepository;


@RestController
public class OrderContoller {

	private FoodRepository foodRepository;
	private OrderRepository orderRepository;
	private CustomerRepository customerRepository;
	
	
	public OrderContoller(FoodRepository foodRepository, OrderRepository orderRepository,
			CustomerRepository customerRepository) {
		super();
		this.foodRepository = foodRepository;
		this.orderRepository = orderRepository;
		this.customerRepository = customerRepository;
	}
	

	
}


