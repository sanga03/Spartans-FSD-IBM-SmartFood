package com.mycompany.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycompany.entity.Food;
import com.mycompany.entity.UserOrder;
import com.mycompany.model.RequestModel;
import com.mycompany.model.ResponseModel;
import com.mycompany.service.UserOrderService;

@CrossOrigin
@RestController
@RequestMapping("/")
public class OrderContoller {

	@Autowired 
	private UserOrderService userOrder;
	
	
	public OrderContoller(UserOrderService userOrder) {
		super();
		this.userOrder = userOrder;
	}
	
	@PostMapping("/push")
	public boolean addOrder(@RequestBody RequestModel req) {
			try {
		UserOrder uo=new UserOrder();
		uo.setRestId(req.getRestId());
		uo.setDate(req.getDate());
		uo.setCustomerId(req.getCustomerId());
	
		
		String ruid="UO"+uo.getCustomerId()+uo.getDate()+Math.random()*2000;
		uo.setUorderId(ruid);
		List<String> foodids= req.getFoodorderid();
		userOrder.createOrder(uo);
		
		List<Food> foods=new ArrayList<Food>();
		for(String fid:foodids) {
			System.out.println(fid);
			Food f = new Food();
//			f.setfUid(ruid);
//			f.setfUid(ruid);
			f.setUorderId(ruid);
			f.setCustFoodId(fid);
			f.setUserOrder(uo);
			foods.add(f);
		}
		userOrder.creteFood(foods);
	return true;
	}catch (Exception e) {
		e.printStackTrace();
		return false;
	}	
		
//		UserOrder uo = userOrder.createOrder(mapper.map(req,UserOrder.class));
		
	
	}
	
	@GetMapping("listId/{custId}")
	public List<ResponseModel> getAllOrdersbyId(@PathVariable String custId){
		return userOrder.getAllById(custId);
	}
	
	
	
//	@GetMapping("list")
//	public List<ResponseModel> getAllOrders(){
//	return userOrder.getAll();	
//	}
	
	
	@GetMapping("findByUid/{uorderId}")
	public ResponseModel getOrderbyId(@PathVariable String uorderId){
	return userOrder.getById(uorderId);	
	}
	@GetMapping("/deleteOrder/{custId}")
	public void deleteOrder(@PathVariable("custId") String uorderId) {
		userOrder.deleteAll(uorderId);
	}
	

	
}


 