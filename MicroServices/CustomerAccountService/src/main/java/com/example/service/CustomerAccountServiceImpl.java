package com.example.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.entity.CustomerAccount;
import com.example.entity.CustomerAccountRepository;
import com.example.model.RequestModel;
import com.example.model.ResponseModel;
import com.example.shared.CustomerAccountDto;

@Service
public class CustomerAccountServiceImpl implements CustomerAccountService
{

	private Environment env;
	private CustomerAccountRepository car;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public CustomerAccountServiceImpl(Environment env, CustomerAccountRepository car,
			BCryptPasswordEncoder bCryptPasswordEncoder) {
		super();
		this.env = env;
		this.car = car;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	public CustomerAccountDto createCustomer(CustomerAccountDto dto) {
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		dto.setPasswordBcrypt(bCryptPasswordEncoder.encode(dto.getPassword()));
		CustomerAccount c = mapper.map(dto,CustomerAccount.class);
		c.setPassword(dto.getPasswordBcrypt());
		c.setUid("U"+dto.getName().substring(0, 4)+dto.getPhone().substring(4, 5)+dto.getPasswordBcrypt().substring(3, 7));
		car.save(c);
		CustomerAccountDto Dto = mapper.map(c,CustomerAccountDto.class);
		return Dto;
	}

	@Override
	public CustomerAccountDto updateCustomer(CustomerAccountDto dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CustomerAccountDto> findAllCustomers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CustomerAccountDto findByUu_id(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CustomerAccountDto findByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}
	

}
