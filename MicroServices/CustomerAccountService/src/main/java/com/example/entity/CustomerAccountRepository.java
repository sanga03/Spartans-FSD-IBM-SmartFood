package com.example.entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.model.ResponseModel;

@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, Integer>{
	public Optional<CustomerAccount> findByUid(String id);
	public Optional<CustomerAccount> findByEmail(String email);

}
