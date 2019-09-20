package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Customer;
import com.example.demo.entity.PhysicalDetail;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
	
}
