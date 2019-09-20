package com.example.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface CustomerPhysicalRepo extends JpaRepository<CustomerPhysical, Integer> {

}
