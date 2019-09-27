package com.example.demo.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.demo.paymentmodel.RequestModel;
import com.example.demo.paymentmodel.ResponseModel;


@FeignClient(name="payment-record")

public interface PaymentClient {

	@RequestMapping(value="/payment",method=RequestMethod.POST)
	 public ResponseModel insertPaymentDetail(@RequestBody RequestModel requestModel);
	
	@RequestMapping(value="/payment/{uuid}",method=RequestMethod.GET)
	   public ResponseEntity<ResponseModel> findByUUID(@PathVariable("uuid") String uuid);
	
	@RequestMapping(value="/payment/byCustomer/{cuuid}",method=RequestMethod.GET)
	   public List<ResponseModel> findCustomerTrackByCustomer(@PathVariable("cuuid") String s);
}
