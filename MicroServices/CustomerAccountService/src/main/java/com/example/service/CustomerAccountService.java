package com.example.service;

import java.util.List;

import com.example.model.RequestModel;
import com.example.model.ResponseModel;
import com.example.shared.CustomerAccountDto;

public interface CustomerAccountService {

	public CustomerAccountDto createCustomer(CustomerAccountDto dto);
	public CustomerAccountDto updateCustomer(CustomerAccountDto dto,String uid);
	public void deleteCustomer(String uid);
	public List<CustomerAccountDto> findAllCustomers();
	public CustomerAccountDto findByUid(String id);
	public CustomerAccountDto findByEmail(String email);
	
}
