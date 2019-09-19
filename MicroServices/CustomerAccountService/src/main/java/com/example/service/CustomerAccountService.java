package com.example.service;

import java.util.List;

import com.example.model.RequestModel;
import com.example.model.ResponseModel;
import com.example.shared.CustomerAccountDto;

public interface CustomerAccountService {

	public CustomerAccountDto createCustomer(CustomerAccountDto dto);
	public CustomerAccountDto updateCustomer(CustomerAccountDto dto);
	public List<CustomerAccountDto> findAllCustomers();
	public CustomerAccountDto findByUu_id(String id);
	public CustomerAccountDto findByEmail(String email);
	
}
