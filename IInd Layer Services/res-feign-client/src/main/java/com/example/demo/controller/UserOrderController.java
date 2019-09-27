package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.client.PaymentClient;
import com.example.demo.client.UserOrderClient;
import com.example.demo.userordermodel.RequestModel;
import com.example.demo.userordermodel.ResponseModel;

@RestController
//@RequestMapping("/")
public class UserOrderController {

	@Autowired
	UserOrderClient ruservice;
	@Autowired
	PaymentClient paymentClient;

	@PostMapping("/addOrder")
	public boolean addOrder(@RequestBody RequestModel req) {

		boolean responseModel = ruservice.addOrder(req);
		com.example.demo.paymentmodel.RequestModel requestModelObjForPayment = new com.example.demo.paymentmodel.RequestModel();
		// set resId uuid and amount in requestModelObjForPayment
		// paymentClient.insertPaymentDetail(requestModelObjForPayment)
		// RequestModel requestObjForPayment=new RequestModel();
		requestModelObjForPayment.setResId(req.getRestId());// setRestId(req.getRestId());

		requestModelObjForPayment.setUuid(req.getCustomerId());

		paymentClient.insertPaymentDetail(requestModelObjForPayment);
		return responseModel;
	}

	@GetMapping("/list")
	public List<ResponseModel> getAllOrders() {
		return ruservice.getAllOrders();

	}

	@GetMapping("listId/{custId}")
	public List<ResponseModel> getAllOrdersbyId(@PathVariable String custId) {
		return ruservice.getAllOrdersbyId(custId);
	}

}
