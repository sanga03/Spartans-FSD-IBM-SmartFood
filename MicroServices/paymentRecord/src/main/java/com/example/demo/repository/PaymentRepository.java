package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.CustomerAccount;
import com.example.demo.entity.PaymentRecord;
import com.example.demo.entity.Restaurant;



@Repository
public interface PaymentRepository extends JpaRepository<PaymentRecord, Integer> {
   public Optional<PaymentRecord> findByPUuid(String pUuid);
   public List<PaymentRecord> findAllByCustomerAccount(CustomerAccount customerAccount);
   public List<PaymentRecord> findAllByRestaurant(Restaurant restaurant);
}
