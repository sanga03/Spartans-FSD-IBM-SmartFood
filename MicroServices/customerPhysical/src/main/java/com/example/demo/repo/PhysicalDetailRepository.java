package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.demo.entity.CustomerAccount;
import com.example.demo.entity.PhysicalDetail;

@Repository
public interface PhysicalDetailRepository extends JpaRepository<PhysicalDetail, Integer> {
   public Optional<PhysicalDetail> findByUPuuid(String uPuuid);
   public Optional<PhysicalDetail> findByCustomerAccount(CustomerAccount customerAccount);
   
}
