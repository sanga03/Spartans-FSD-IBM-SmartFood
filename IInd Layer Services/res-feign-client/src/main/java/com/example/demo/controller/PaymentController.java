package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.client.PaymentClient;
import com.example.demo.paymentmodel.RequestModel;
import com.example.demo.paymentmodel.ResponseModel;


@RestController
public class PaymentController {
	
	@Autowired
	PaymentClient paymentClient;
	
	
	@PostMapping("/payment")
	public ResponseModel insertPaymentDetail(@RequestBody RequestModel requestModel) {
		return paymentClient.insertPaymentDetail(requestModel);
	}
	
	//find by payment id
	@GetMapping("/payment/{uuid}")
	 public ResponseEntity<ResponseModel> findByUUID(@PathVariable("uuid") String uuid){
		return paymentClient.findByUUID(uuid);
	}

	@GetMapping("/payment/byCustomer/{cuuid}")
	public List<ResponseModel> findCustomerTrackByCustomer(@PathVariable("cuuid") String s)
	{
		return paymentClient.findCustomerTrackByCustomer(s);
	}
}
