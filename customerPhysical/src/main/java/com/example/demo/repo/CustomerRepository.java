package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.demo.entity.CustomerAccount;
import com.example.demo.entity.PhysicalDetail;

public interface CustomerRepository extends JpaRepository<CustomerAccount,Integer> {
    
	public Optional<CustomerAccount> findByUid(String uId);
}
