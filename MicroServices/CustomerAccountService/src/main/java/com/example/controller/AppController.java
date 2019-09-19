package com.example.controller;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.RequestModel;
import com.example.service.CustomerAccountServiceImpl;
import com.example.shared.CustomerAccountDto;

@RestController
@RequestMapping("/")
public class AppController {
	private CustomerAccountServiceImpl service;
	
	@Autowired
	public AppController(CustomerAccountServiceImpl service) {
		super();
		this.service = service;
	}
	
	@GetMapping("/test")
	public String home() {
		return "All ok!";
	}




	@PostMapping("/addCustomer")
	public ResponseEntity<CustomerAccountDto> addCustomer(@RequestBody RequestModel req){
		System.out.println("check");
		System.out.println(req.getEmail());
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(req,CustomerAccountDto.class);
		System.out.println("testtest "+dto.getEmail());
		
		CustomerAccountDto dt = service.createCustomer(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(dt);
		

	}
}
