package com.mycompany.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.mycompany.entity.UserOrder;

@Repository
public interface OrderRepository extends CrudRepository <UserOrder, Long>{

}
