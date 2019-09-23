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
import com.example.service.EmailServiceImpl;
import com.example.service.PasswordServiceImpl;
import com.example.shared.CustomerAccountDto;

@RestController
@RequestMapping("/")
public class AppController {
	
	private CustomerAccountServiceImpl service;
	private CustomerPhysicalRepo pr;
	private EmailServiceImpl email;
	private PasswordServiceImpl pass;
	@Autowired
	public AppController(PasswordServiceImpl pass,CustomerAccountServiceImpl service,CustomerPhysicalRepo pr,CustomerAccountRepository  cr,EmailServiceImpl email) {
		super();
		this.service = service;
		this.pr=pr;
		this.email = email;
		this.pass = pass;
	}
	
	@PostMapping("/email")
	public String sendEmail(@RequestParam String em) throws Exception {
		email.sendEmail(em);
		return "email sent!";
		
	}
	@PostMapping("/add")
	public CustomerAccountDto test(){
		CustomerPhysical cp = new CustomerPhysical(145,40,"23/01/1998", 5600);
		CustomerAccount c = new CustomerAccount("test","test","test","9067564534");
		c.setC_phy(cp);
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
	@GetMapping("/find")
	public List<CustomerPhysical> find(String uid){
		List<CustomerPhysical> list = pr.findAll();
		for(CustomerPhysical l:list)
		{
		
		}
		return null;
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
		return service.findByUid(email);
	}
	
	@PostMapping("/changePassword")
	public String changePassword(@RequestParam String uid,@RequestParam String password) {
		pass.updatePassword(password, uid);
		return "Password changed!";
	}
}

