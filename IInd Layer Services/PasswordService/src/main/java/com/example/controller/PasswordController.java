package com.example.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.clients.CustomerAccountIntf;
import com.example.models.CustomerAccountDto;
import com.example.models.RequestModel;

@RestController
@RequestMapping("/")
public class PasswordController {
	
	private String otp;
	private RequestModel modelUser;
	private CustomerAccountIntf cai;
	private String email;
	
	@Autowired
	public PasswordController(CustomerAccountIntf cai) {
		super();
		this.cai = cai;
	}
	
	
	public PasswordController() {
		super();
	}


	public double getRandomIntegerBetweenRange(){
	    double x = (int)(Math.random()*((100000-0)+1))+0;
	    return x;
	}
	
	@PostMapping("/changePassword")
	public Integer registerUser(@RequestParam String email,HttpServletRequest request) {
		Integer str1 = 0;
		this.setEmail(email);
		CustomerAccountDto dto = cai.findByEmail(email);
		if(dto == null) 
		{
			this.otp = cai.sendEmail(email);
			System.out.println("email sent for password"+getOtp());
		}
		else
			str1 = 1;
		return str1;
	}
	
	@GetMapping("/verifyOtp")
	public boolean confirmUser(@RequestParam String otpU,@RequestParam String password, HttpServletRequest request) {
		boolean a=true;
		HttpSession session = request.getSession();
		String str = (String) session.getAttribute("otp");
		
		System.out.println(this.otp+" "+otpU+" "+str);
		
		RequestModel req = (RequestModel) session.getAttribute("userData");
		if(this.getOtp().equalsIgnoreCase(otpU))
		{
			CustomerAccountDto dto = cai.changePassword(this.getEmail(), password);
			session.setAttribute("uuid", dto.getUuid());
			a=true;
		}
		else
		{
			a=false;
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
		return modelUser;
	}

	public void setModel(RequestModel model) {
		this.modelUser = model;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}
	

	
}
