package com.mycompany.controller;

import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mycompany.entity.UserOrder;
import com.mycompany.model.RequestModel;
import com.mycompany.model.ResponseModel;
import com.mycompany.service.UserOrderService;


@RestController
@RequestMapping("/")
public class OrderContoller {

	@Autowired 
	private UserOrderService userOrder;
	
	public OrderContoller(UserOrderService userOrder) {
		super();
		this.userOrder = userOrder;
	}
	
	@PostMapping("/addOrder")
	public ResponseModel addOrder(@RequestBody RequestModel req) {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		UserOrder uo = userOrder.createOrder(mapper.map(req,UserOrder.class));
		return mapper.map(uo,ResponseModel.class);
	}
	
	@GetMapping("/list")
	public List<ResponseModel> getAllOrders(){
		List<UserOrder> list = userOrder.getAllOrders();
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		for(UserOrder l:list)
			listnew.add(mapper.map(l,ResponseModel.class));
		return listnew;
	}
	@PostMapping("/deleteOrder/{uorderId}")
	public void deleteOrder(@PathVariable String uorderId) {
		userOrder.deleteOrderByUorderId(uorderId);
	}
	
	@PostMapping("/deleteFood/{foodId}")
	public void deleteFood(@PathVariable String foodId) {
		userOrder.deleteByFoodId(foodId);
	}
	
	//find obj
/*	
	@GetMapping("/date/{date}")
	public ResponseModel findByDate(@PathVariable String date){
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		UserOrder uo = userOrder.findByDate(date);
		return mapper.map(uo,ResponseModel.class);
	}
	
	@GetMapping("/cust/{custId}")
	public ResponseModel findByCustId(@PathVariable String custId){
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		UserOrder uo = userOrder.findByCustId(custId);
		return mapper.map(uo,ResponseModel.class);
	}
	
*/
	@GetMapping("/order/{uorderId}")
	public ResponseModel findByOrder(@PathVariable String uorderId){
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		UserOrder uo = userOrder.findOrderByUorderId(uorderId);
		return mapper.map(uo,ResponseModel.class);
	}
	
	// find all objs
	
	@GetMapping("/allCust/{custId}")
	public List<ResponseModel> findAllCust(@PathVariable String custId){
		List<UserOrder> list = userOrder.findAllByCust(custId);
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		for(UserOrder l:list)
			listnew.add(mapper.map(l,ResponseModel.class));
		return listnew;
	}
	
	@GetMapping("/allRest/{custId}")
	public List<ResponseModel> findAllRest(@PathVariable int custId){
		List<UserOrder> list = userOrder.findAllByRes(custId);
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		for(UserOrder l:list)
			listnew.add(mapper.map(l,ResponseModel.class));
		return listnew;
	}
	
	@GetMapping("/allDate/{date}")
	public List<ResponseModel> findAllDate(@PathVariable String date){
		List<UserOrder> list = userOrder.findAllByDate(date);
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		for(UserOrder l:list)
			listnew.add(mapper.map(l,ResponseModel.class));
		return listnew;
	}
	
	
	
}


 