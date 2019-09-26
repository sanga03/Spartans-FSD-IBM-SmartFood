package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.demo.entity.CustomerAccount;
import com.example.demo.entity.CustomerTrack;
@Repository
public interface CustomerRepository extends JpaRepository<CustomerAccount, Integer> {

	
  public Optional<CustomerAccount> findByUid(String uid);
}
