package com.example.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.clients.CustomerAccountIntf;
import com.example.models.CustomerAccountDto;
import com.example.models.LoginModel;
import com.example.models.RequestModel;

@RestController
@RequestMapping("/")
public class LoginController {
	private CustomerAccountIntf cai;
	private BCryptPasswordEncoder bcrypt;
	
	@Autowired
	public LoginController(CustomerAccountIntf cai,BCryptPasswordEncoder bcrypt) {
		super();
		this.cai = cai;
		this.bcrypt = bcrypt;
	}

    @PostMapping("/userLogin")
	public Integer getCredentials(@RequestBody LoginModel model) {
		Integer str = 0;
		CustomerAccountDto dto= cai.findByEmail(model.getEmail());
		if(dto != null) {
			if(bcrypt.matches(model.getPassword(),dto.getPassword() ))
				str = 0;	
			else
				str = 1;
		}
		else
		{
			str = 2;
		}
		
		return str;
	}
    
    @PostMapping("/addUser")
    public String addUser(@RequestBody RequestModel model) {
    	cai.addCustomer(model);
    	return "added";
    }
}