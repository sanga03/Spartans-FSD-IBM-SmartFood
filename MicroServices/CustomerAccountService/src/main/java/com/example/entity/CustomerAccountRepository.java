package com.example.entity;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.ResponseModel;

public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, Integer>{
	public ResponseModel findByUid(String id);
	public ResponseModel findByEmail(String email);

}
