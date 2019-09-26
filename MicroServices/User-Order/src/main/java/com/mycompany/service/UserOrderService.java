package com.mycompany.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import com.mycompany.entity.Food;
import com.mycompany.entity.UserOrder;
import com.mycompany.repository.FoodRepository;
import com.mycompany.repository.OrderRepository;

@Service
public class UserOrderService {

	private OrderRepository orderRepo;
	private FoodRepository foodRepo;
	
	@Autowired
	public UserOrderService(OrderRepository orderRepo, FoodRepository foodRepo) {
		super();
		this.orderRepo = orderRepo;
		this.foodRepo = foodRepo;
	}
	
	//add order
	public UserOrder createOrder(UserOrder orderDetail) {
		ModelMapper mapper = new ModelMapper();
		UserOrder order = mapper.map(orderDetail, UserOrder.class);
		order.setUorderId(UUID.randomUUID().toString());
		System.out.println(order.getUorderId());
		orderRepo.save(order);
//		System.out.println(order.getCust());
//		System.out.println(order.getRestId());
		return order;
	}
	
	//get all orders
	public List<UserOrder> getAllOrders() {
		List<UserOrder> orders = orderRepo.findAll();
		return orders;
	}
	
	// find by uid
	public UserOrder findOrderByUorderId(String uorderId) {
		
		Optional<UserOrder> order = orderRepo.findByUorderId(uorderId);
		if(order.isPresent())
		{
			return order.get();
		}
		return null;
	}
	
	
	public void deleteOrderByUorderId(String uorderId) {
		
		Optional<UserOrder> order = orderRepo.findByUorderId(uorderId);
		UserOrder uo = null;
		if (order.isPresent())
			uo = order.get();
		orderRepo.delete(uo);
	}

	public UserOrder findByCustId(String custId) {
		Optional<UserOrder> or = orderRepo.findByCust(custId);
		if(or.isPresent())
		{
			return or.get();
		}
		return null;
	}

	public UserOrder findByDate(String date) {
		Optional<UserOrder> or = orderRepo.findByDate(date);
		if(or.isPresent())
		{
			return or.get();
		}
		return null;
	}

	public void deleteByFoodId(String foodId) {
		
		Optional<Food> food = foodRepo.deleteByFUid(foodId);
		Food foo = null;
		if (food.isPresent())
			foo = food.get();
		foodRepo.delete(foo);
	}
	
	//find all by date
	public List<UserOrder> findAllByDate(String date)
	{
		return orderRepo.findAllByDate(date);
	}
	
	//find all by restId
	public List<UserOrder> findAllByRes(String cust)
	{
		return orderRepo.findAllByRestId(cust);
	}
	
	//find all y custId
	public List<UserOrder> findAllByCust(String cust)
	{
		return orderRepo.findAllByCust(cust);
	}
}
