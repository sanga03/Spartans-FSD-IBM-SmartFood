package com.example.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.entity.CustomerAccount;
import com.example.entity.CustomerAccountRepository;
import com.example.shared.CustomerAccountDto;

@Service
public class PasswordServiceImpl {
	private Environment env;
	private CustomerAccountRepository service;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	
	@Autowired
	public PasswordServiceImpl(CustomerAccountRepository service,Environment env,BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.service= service;
		this.env =env;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}
	
	public CustomerAccountDto updatePassword(String password,String email){
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		CustomerAccount ca=null;
		
		Optional<CustomerAccount> op= service.findByEmail(email);
		if(op.isPresent())
			ca = op.get();
		ca.setPassword(bCryptPasswordEncoder.encode(password));
		System.out.println(ca.getEmail()+ca.getPassword());
		CustomerAccountDto dto = mapper.map(service.save(ca),CustomerAccountDto.class);
		return dto;
	}
}
