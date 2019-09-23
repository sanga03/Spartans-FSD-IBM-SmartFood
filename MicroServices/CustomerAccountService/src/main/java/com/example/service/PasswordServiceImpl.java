package com.example.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.entity.CustomerAccount;
import com.example.entity.CustomerAccountRepository;

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
	
	public void updatePassword(String password,String uid) {
		CustomerAccount ca=null;
		Optional<CustomerAccount> op= service.findByUid(uid);
		if(op.isPresent())
			ca = op.get();
		ca.setPassword(bCryptPasswordEncoder.encode(password));
		service.save(ca);
		
	}
}
