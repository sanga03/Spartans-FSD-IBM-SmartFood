package com.mycompany.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.entity.Food;
import com.mycompany.entity.UserOrder;
import com.mycompany.model.ResponseModel;
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
	public UserOrder createOrder(UserOrder order) {
//		order.setUorderId("UO"+order.getCustomerId()+order.getDate());
		
		System.out.println(order.getUorderId());
		orderRepo.save(order);
//		System.out.println(order.getCust());
//		System.out.println(order.getRestId());
		return order;
	}
	
	public void deleteAll(String customerId) {
		List<UserOrder> orders = orderRepo.findAllByCustomerId(customerId);
		
	for(UserOrder userOrder:orders) {
		
		orderRepo.delete(userOrder);
	}
		
	}
	public void creteFood(List<Food> foods) {
		for(Food f:foods) {
			System.out.println(f);
			foodRepo.saveAndFlush(f);
		}
	}
	
	public List<ResponseModel> getAllbyID(){
		List<UserOrder> orders = orderRepo.findAll();
		List<ResponseModel> models =new ArrayList<ResponseModel>();
		for(UserOrder order:orders) 
		{
			ResponseModel model = new ResponseModel();
			model.setCust(order.getCustomerId());
			model.setDate(order.getDate());
			model.setRestId(order.getRestId());
			model.setUorderId(order.getUorderId());
			List<String> list = new ArrayList<String>();
			System.out.println(order.getUorderId());
	
			List<Food> foods = foodRepo.findAllByUorderId(order.getUorderId());
			for(Food food:foods) {
				System.out.println(food);
				list.add(food.getCustFoodId());
			}
		System.out.println(list);
		model.setFoodorderid(list);
		models.add(model);
		}
		
			return models;
	}

	public ResponseModel getById(String uOrder) {
		if(orderRepo.findByUorderId(uOrder).isEmpty()) {
			return new ResponseModel();
		}
		UserOrder order = orderRepo.findByUorderId(uOrder).get(0);
		
		ResponseModel model = new ResponseModel();
		model.setCust(order.getCustomerId());
		model.setDate(order.getDate());
		model.setRestId(order.getRestId());
		model.setUorderId(order.getUorderId());
		List<String> list = new ArrayList<String>();
		System.out.println(order.getUorderId());

		List<Food> foods = foodRepo.findAllByUorderId(order.getUorderId());
		for(Food food:foods) {
			System.out.println(food);
			list.add(food.getCustFoodId());
		}
	System.out.println(list);
	model.setFoodorderid(list);
	return model;
		
	}
	
	public List<ResponseModel> getAllById(String custId) {
		List<UserOrder> orders = orderRepo.findAllByCustomerId(custId);
		List<ResponseModel> models =new ArrayList<ResponseModel>();
		for(UserOrder order:orders) 
		{
			ResponseModel model = new ResponseModel();
			model.setCust(order.getCustomerId());
			model.setDate(order.getDate());
			model.setRestId(order.getRestId());
			model.setUorderId(order.getUorderId());
			List<String> list = new ArrayList<String>();
			System.out.println(order.getUorderId());
	
			List<Food> foods = foodRepo.findAllByUorderId(order.getUorderId());
			for(Food food:foods)
			{
				System.out.println(food);
				list.add(food.getCustFoodId());
			}
			System.out.println(list);
			model.setFoodorderid(list);
			models.add(model);
		}
		
			return models;
	}
//	
//	//get all orders
//	public List<UserOrder> getAllOrders() {
//		List<UserOrder> orders = orderRepo.findAll();
//		return orders;
//	}
//	
//	// find by uid
//	public UserOrder findOrderByUorderId(String uorderId) {
//		
//		Optional<UserOrder> order = orderRepo.findByUorderId(uorderId);
//		if(order.isPresent())
//		{
//			return order.get();
//		}
//		return null;
//	}
//	
//	
//	public void deleteOrderByUorderId(String uorderId) {
//		
//		Optional<UserOrder> order = orderRepo.findByUorderId(uorderId);
//		UserOrder uo = null;
//		if (order.isPresent())
//			uo = order.get();
//		orderRepo.delete(uo);
//	}
//
//	public UserOrder findByCustId(String custId) {
//		Optional<UserOrder> or = orderRepo.findByCust(custId);
//		if(or.isPresent())
//		{
//			return or.get();
//		}
//		return null;
//	}
//
//	public UserOrder findByDate(String date) {
//		Optional<UserOrder> or = orderRepo.findByDate(date);
//		if(or.isPresent())
//		{
//			return or.get();
//		}
//		return null;
//	}
//
//	public void deleteByFoodId(String foodId) {
//		
//		Optional<Food> food = foodRepo.deleteByFUid(foodId);
//		Food foo = null;
//		if (food.isPresent())
//			foo = food.get();
//		foodRepo.delete(foo);
//	}
//	
//	//find all by date
//	public List<UserOrder> findAllByDate(String date)
//	{
//		return orderRepo.findAllByDate(date);
//	}
//	
//	//find all by restId
//	public List<UserOrder> findAllByRes(String cust)
//	{
//		return orderRepo.findAllByRestId(cust);
//	}
//	
//	//find all y custId
//	public List<UserOrder> findAllByCust(String cust)
//	{
//		return orderRepo.findAllByCust(cust);
//	}
}
