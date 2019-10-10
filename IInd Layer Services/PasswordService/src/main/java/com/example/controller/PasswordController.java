package com.example.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	private CustomerAccountDto model;
	private BCryptPasswordEncoder bcrypt;
	
	@Autowired
	public PasswordController(BCryptPasswordEncoder bcrypt, CustomerAccountIntf cai) {
		super();
		this.cai = cai;
		this.bcrypt = bcrypt;
		
	}
	
	
	public PasswordController() {
		super();
	}


	public double getRandomIntegerBetweenRange(){
	    double x = (int)(Math.random()*((100000-0)+1))+0;
	    return x;
	}
	
	@GetMapping("/userPassword")
	public Integer registerUser(@RequestParam String email,HttpServletRequest request) {
		Integer str1 = 0;
		this.setEmail(email);
		CustomerAccountDto dto = cai.findByEmail(email);
		model = dto;
		if(dto != null) 
		{
			this.otp = cai.sendEmail(email);
			System.out.println("email sent for password"+getOtp());
		}
		else
			str1 = 1;
		return str1;
	}
	
	@GetMapping("/verifyOtp")
	public int confirmUser(@RequestParam String otp,@RequestParam String password, HttpServletRequest request) {
		int a=1;
		HttpSession session = request.getSession();
		String str = (String) session.getAttribute("otp");
		
		System.out.println(this.otp+" "+otp+" "+str);
		
		
		if(this.getOtp().equalsIgnoreCase(otp))
		{
			CustomerAccountDto dto = cai.changePassword(this.getEmail(), password);
			session.setAttribute("uuid", dto.getUuid());
			System.out.println(model.getPassword()+password);
			if(bcrypt.matches(password,model.getPassword()))
					a=2;
			else
				a=0;
				
		}
		else
		{
			a=1;
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
