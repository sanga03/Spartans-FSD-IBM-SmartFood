package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.clients.CustomerAccountIntf;
import com.example.models.RequestModel;

@RestController
@RequestMapping("/")
public class RegisterController {
	private String otp;
	private RequestModel model;
	private CustomerAccountIntf cai;
	
	@Autowired
	public RegisterController(CustomerAccountIntf cai) {
		super();
		this.cai = cai;
	}
	
	public double getRandomIntegerBetweenRange(){
	    double x = (int)(Math.random()*((100000-0)+1))+0;
	    return x;
	}
	
	@PostMapping("/registerUser")
	public String registerUser(@RequestBody RequestModel modelU) {
		this.model  = modelU;
		this.setOtp(String.valueOf(Math.round(Math.random()*1000000)));		
		cai.sendEmail(modelU.getEmail(),this.getOtp());
		return "email sent! == "+otp;
	}
	
	@GetMapping("/userOtp")
	public boolean confirmUser(@RequestParam String otpU) {
		boolean a=false;
		if(otpU == this.getOtp())
		{
			cai.addCustomer(getModel());
			a=true;
		}
		return a;
		
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public RequestModel getModel() {
		return model;
	}

	public void setModel(RequestModel model) {
		this.model = model;
	}
	
	

}
