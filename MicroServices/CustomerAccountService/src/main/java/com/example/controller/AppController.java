package com.example.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.CustomerAccount;
import com.example.entity.CustomerAccountRepository;
import com.example.entity.CustomerPhysical;
import com.example.entity.CustomerPhysicalRepo;
import com.example.model.RequestModel;
import com.example.service.CustomerAccountServiceImpl;
import com.example.shared.CustomerAccountDto;

@RestController
@RequestMapping("/")
public class AppController {
	
	private CustomerAccountServiceImpl service;
	private CustomerPhysicalRepo pr;
	private CustomerAccountRepository  cr;
	@Autowired
	public AppController(CustomerAccountServiceImpl service,CustomerPhysicalRepo pr) {
		super();
		this.service = service;
		this.pr=pr;
	}

	@PostMapping("/add")
	public CustomerAccountDto test(){
		CustomerPhysical cp = new CustomerPhysical(145,40,"23/01/1998", 5600);
		CustomerAccount c = new CustomerAccount("test", "test", "test", "9067564534");
		c.setCp(cp);
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(c,CustomerAccountDto.class);
		service.createCustomer(dto);
		pr.save(cp);
		return dto;
	}


	@PostMapping("/addCustomer")
	public CustomerAccountDto addCustomer(@RequestBody RequestModel req){
		System.out.println("check");
		System.out.println(req.getEmail());
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(req,CustomerAccountDto.class);
		System.out.println("testtest "+dto.getEmail());
		
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
	public CustomerAccountDto updateCustomer(@RequestBody RequestModel req,String uid) {
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
		return service.findByUid(email);
	}
}

