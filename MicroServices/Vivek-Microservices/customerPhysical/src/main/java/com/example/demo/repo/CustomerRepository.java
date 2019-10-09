package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CustomerAccount;

@Repository
public interface CustomerRepository extends JpaRepository<CustomerAccount,Integer> {
    
	//@Query("from CustomerAccount where uid=:uid")
	public CustomerAccount findByUid( String uid);
	
}
