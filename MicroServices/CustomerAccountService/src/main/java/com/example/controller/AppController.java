package com.example.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.CustomerAccount;
import com.example.entity.CustomerAccountRepository;
import com.example.model.RequestModel;
import com.example.service.CustomerAccountServiceImpl;
import com.example.service.EmailServiceImpl;
import com.example.service.PasswordServiceImpl;
import com.example.shared.CustomerAccountDto;

@RestController
@RequestMapping("/")
public class AppController {
	
	private CustomerAccountServiceImpl service;
	private EmailServiceImpl email;
	private PasswordServiceImpl pass;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	public AppController(BCryptPasswordEncoder bCryptPasswordEncoder,PasswordServiceImpl pass,CustomerAccountServiceImpl service,CustomerAccountRepository  cr,EmailServiceImpl email) {
		super();
		this.service = service;
		this.email = email;
		this.pass = pass;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	@PostMapping("/email")
	public String sendEmail(String em,String otp) throws Exception {
		email.sendEmail(em,otp);
		System.out.println("c == "+otp);
		return "email sent!";
		
	}
	@PostMapping("/add")
	public CustomerAccountDto test(){
		System.out.println("check");
		CustomerAccount c = new CustomerAccount("test","test","test","9067564534");
		c.setPassword(bCryptPasswordEncoder.encode(c.getPassword()));
		
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(c,CustomerAccountDto.class);
		service.createCustomer(dto);
		return dto;
	}


	@PostMapping("/addCustomer")
	public CustomerAccountDto addCustomer(@RequestBody RequestModel req){

		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(req,CustomerAccountDto.class);
		dto.setPasswordBcrypt(bCryptPasswordEncoder.encode(req.getPassword()));
		CustomerAccountDto dt = service.createCustomer(dto);
		return dt;
	}
	@PostMapping("/delete")
	public void deleteCustomer(@RequestParam String uid)
	{
		service.deleteCustomer(uid);
	}
	
	@GetMapping("/findAll")
	public List<CustomerAccountDto> findAll(){
		List<CustomerAccountDto> list = service.findAllCustomers();
		return list;
	}
	
	@PostMapping("/update")
	public CustomerAccountDto updateCustomer(@RequestBody RequestModel req,@RequestParam String uid) {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(req,CustomerAccountDto.class);
		return service.updateCustomer(dto,uid);
		
	}
	
	@GetMapping("/findUid")
	public CustomerAccountDto findByUid(@RequestParam String uid) {
		return service.findByUid(uid);
	}
	
	@GetMapping("/findEmail")
	public CustomerAccountDto findByEmail(@RequestParam String email) {
		return service.findByEmail(email);
	}
	
	@PostMapping("/changePassword")
	public String changePassword(@RequestParam String uid,@RequestParam String password) {
		pass.updatePassword(password, uid);
		return "Password changed!";
	}
}

