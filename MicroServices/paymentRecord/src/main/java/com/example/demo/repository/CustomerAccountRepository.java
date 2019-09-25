package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CustomerAccount;
@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, Integer> {
  
	public Optional<CustomerAccount> findByUid(String uid);
}
