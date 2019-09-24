package com.example.demo.populate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;


import com.example.demo.entity.Gender;
import com.example.demo.entity.PhysicalDetail;
import com.example.demo.entity.PhysicalDetailsDto;
import com.example.demo.repo.CustomerRepository;
import com.example.demo.repo.PhysicalDetailRepository;

public class Populate implements ApplicationListener<ContextRefreshedEvent> {
    @Autowired
	private PhysicalDetailRepository physicalDetailRepository;
    @Autowired
	private CustomerRepository customerRepository;
	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		init();
	}
	
	public void init()
	{  
//		Customer cust1 = new Customer(1,"Vivek");
//		PhysicalDetail physicalDetail = new PhysicalDetail(1,"876", Gender.MALE, 0);
//		customerRepository.save(cust1);
//		physicalDetail.setCustomer(cust1);
//		physicalDetailRepository.save(physicalDetail);
//		cust1.setPhysicalDetail(physicalDetail);
//		customerRepository.save(cust1);
//		
	}

}
