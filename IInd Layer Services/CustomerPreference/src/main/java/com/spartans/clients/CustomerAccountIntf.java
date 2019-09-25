package com.spartans.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


import com.example.models.CustomerAccountDto;
import com.example.models.RequestModel;

@FeignClient("customer-account")
@RequestMapping("/")
public interface CustomerAccountIntf {
	@PostMapping("/email")
	public String sendEmail(@RequestParam String em);

	@PostMapping("/addCustomer")
	public CustomerAccountDto addCustomer(@RequestBody RequestModel req);
	
	@PostMapping("/delete")
	public void deleteCustomer(@RequestParam String uid);
	
	@GetMapping("/findAll")
	public List<CustomerAccountDto> findAll();
	
	@PostMapping("/add")
	public CustomerAccountDto test();
	
	
	@PostMapping("/update")
	public CustomerAccountDto updateCustomer(@RequestBody RequestModel req,@RequestParam String uid);
	
	@GetMapping("/findUid")
	public CustomerAccountDto findByUid(@RequestParam String uid);
	
	@GetMapping("/findEmail")
	public CustomerAccountDto findByEmail(@RequestParam String email);
	
	@PostMapping("/changePassword")
	public String changePassword(@RequestParam String uid,@RequestParam String password);
}
