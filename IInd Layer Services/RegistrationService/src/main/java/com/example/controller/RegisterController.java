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
public class RegisterController {
	private String otp;
	private RequestModel model;
	private CustomerAccountIntf cai;
	
	@Autowired
	public RegisterController(CustomerAccountIntf cai) {
		super();
		this.cai = cai;
	}
	
	
	public RegisterController() {
		super();
	}


	public double getRandomIntegerBetweenRange(){
	    double x = (int)(Math.random()*((100000-0)+1))+0;
	    return x;
	}
	
	@PostMapping("/registerUser")
	public Integer registerUser(@RequestBody RequestModel model,HttpServletRequest request) {
		Integer str1 = 0;
		CustomerAccountDto dto = cai.findByEmail(model.getEmail());
		if(dto == null) {
		String str = cai.sendEmail(model.getEmail());
		HttpSession session = request.getSession();
		session.setAttribute("userData", model);
		session.setAttribute("otp",str);
		str1 = 0;
		}
		else
			str1 = 1;
		return str1;
	}
	
	@GetMapping("/userOtp")
	public boolean confirmUser(@RequestParam String otpU,HttpServletRequest request) {
		boolean a=true;
		HttpSession session = request.getSession();
		String str = (String) session.getAttribute("otp");
		RequestModel req = (RequestModel) session.getAttribute("userData");
		if(otpU.equalsIgnoreCase(str))
		{
			CustomerAccountDto dto = cai.addCustomer(req);
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
		return model;
	}

	public void setModel(RequestModel model) {
		this.model = model;
	}
	
	

}
