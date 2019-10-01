package com.example.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
	public Integer getCredentials(@RequestBody LoginModel model,HttpServletRequest request) {
		Integer str = 0;
		System.out.println(model.getEmail()+model.getPassword());
		CustomerAccountDto dto= cai.findByEmail(model.getEmail());
		if(dto != null) 
		{
			System.out.println(bcrypt.matches(model.getPassword(),dto.getPassword()));
			if(bcrypt.matches(model.getPassword(),dto.getPassword()))
			{
			str = 0;	
			HttpSession session = request.getSession();
			session.setAttribute("uuid",dto.getUuid());
			}
				else
					str = 1;
		}
		else
		{
			str = 2;
		}
		System.out.println(str);
		return str;
	}
    
    @PostMapping("/addUser")
    public String addUser(@RequestBody RequestModel model) {
    	cai.addCustomer(model);
    	return "added";
    }
}