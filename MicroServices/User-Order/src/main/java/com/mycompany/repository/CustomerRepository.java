package com.mycompany.repository;

import org.springframework.data.repository.CrudRepository;

import com.mycompany.entity.Customer;


public interface CustomerRepository extends CrudRepository<Customer, Long> {

}
