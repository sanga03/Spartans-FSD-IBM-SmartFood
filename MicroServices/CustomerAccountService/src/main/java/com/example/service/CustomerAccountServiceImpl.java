package com.example.service;

import java.util.ArrayList;
import java.util.List;
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
public class CustomerAccountServiceImpl implements CustomerAccountService {

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
		CustomerAccount c = mapper.map(dto, CustomerAccount.class);
		c.setPassword(dto.getPasswordBcrypt());
		c.setUid("U" + dto.getName().substring(0, 4) + dto.getPhone().substring(4, 5)
				+ dto.getPasswordBcrypt().substring(3, 7));
		car.save(c);
		CustomerAccountDto Dto = mapper.map(c, CustomerAccountDto.class);
		return Dto;
	}

	@Override
	public CustomerAccountDto updateCustomer(CustomerAccountDto dto,String uid) {
		Optional<CustomerAccount> op = car.findByUid(uid);
		CustomerAccount ca1 = null;
		if (op.isPresent())
			ca1 = op.get();
		ca1.setName(dto.getName());
		ca1.setEmail(dto.getEmail());
		ca1.setPhone(dto.getPhone());
		car.save(ca1);
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto1 = mapper.map(ca1,CustomerAccountDto.class);
		return dto1;
	}

	@Override
	public List<CustomerAccountDto> findAllCustomers() {

		List<CustomerAccount> list = car.findAll();
		List<CustomerAccountDto> dto = new ArrayList<CustomerAccountDto>();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		for (CustomerAccount l : list)
			dto.add(mapper.map(l, CustomerAccountDto.class));
		return dto;
	}

	@Override
	public CustomerAccountDto findByUid(String id) {
		Optional<CustomerAccount> op = car.findByUid(id);
		CustomerAccount ca = null;
		if (op.isPresent())
			ca = op.get();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(ca, CustomerAccountDto.class);
		return dto;
	}

	@Override
	public CustomerAccountDto findByEmail(String email) {
		Optional<CustomerAccount> op = car.findByEmail(email);
		CustomerAccount ca = null;
		if (op.isPresent())
			ca = op.get();
		ModelMapper mapper = new ModelMapper();
		mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		CustomerAccountDto dto = mapper.map(ca, CustomerAccountDto.class);
		return dto;
	}

	@Override
	public void deleteCustomer(String uid) {
		Optional<CustomerAccount> op = car.findByUid(uid);
		CustomerAccount ca = null;
		if (op.isPresent())
			ca = op.get();
		car.delete(ca);
	}

}
