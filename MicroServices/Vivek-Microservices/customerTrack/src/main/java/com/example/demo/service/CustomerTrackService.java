package com.example.demo.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.CustomerTrackDto;
import com.example.demo.entity.CustomerTrack;
import com.example.demo.repository.CustomerTrackRepository;



@Service
public class CustomerTrackService {
  
	private CustomerTrackRepository customerTrackRepository; 
	private ModelMapper mapper;
   
	@Autowired
     public CustomerTrackService(CustomerTrackRepository customerTrackRepository) {
	super();
	this.customerTrackRepository = customerTrackRepository;
	 this.mapper = new ModelMapper();
	this.mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
   }
   public CustomerTrackDto insertcustomeTrackDto(CustomerTrackDto customerTrackDto)
   {
	  
   	CustomerTrack customerTrack = mapper.map(customerTrackDto, CustomerTrack.class);
   	customerTrackRepository.save(customerTrack);
   	customerTrackDto = mapper.map(customerTrack, CustomerTrackDto.class);
    return customerTrackDto;
   }
   
   public CustomerTrackDto findByUUID(String uuid)
   {     CustomerTrackDto customerTrackDto;
	   Optional<CustomerTrack> customerTrack = customerTrackRepository.findByUtUuid(uuid);
	   if(customerTrack.isPresent())
	   {
		   customerTrackDto = mapper.map(customerTrack.get(), CustomerTrackDto.class);
		   
	   }
	   else
	   {
		   customerTrackDto = null;
	   }
	   
	   return customerTrackDto;
   }
   public void deleteByUUID(String uuid)
   {  
      Optional<CustomerTrack> customerTrack = customerTrackRepository.findByUtUuid(uuid);
     if(customerTrack.isPresent())
     {
    	 customerTrackRepository.delete(customerTrack.get());
     }  
   }
   
   public CustomerTrackDto updateCustomerTrack(CustomerTrackDto customerTrackDto)
   {   
	   Optional<CustomerTrack> customerTrack = customerTrackRepository.findByUtUuid(customerTrackDto.getUtUuid());
	   if(customerTrack.isPresent())
	   {  
		  CustomerTrack tempCustomerTrack = customerTrack.get();
		  CustomerTrack cTrack = mapper.map(customerTrackDto, CustomerTrack.class);
		  cTrack.setId(tempCustomerTrack.getId());
		  cTrack = customerTrackRepository.save(cTrack);
		  customerTrackDto = mapper.map(cTrack, CustomerTrackDto.class);
		  return customerTrackDto;
	   }
	   
	   return null;
   }
}
