package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.demo.entity.CustomerAccount;
import com.example.demo.entity.CustomerTrack;

@Repository
public interface CustomerTrackRepository extends JpaRepository<CustomerTrack, Integer> {
     public Optional<CustomerTrack> findByUtUuid(String uuid);

	public Optional<CustomerTrack> findByCustomerAccount(CustomerAccount customerAccount);
	public List<CustomerTrack> findAllByCustomerAccount(CustomerAccount customerAccount);
}
