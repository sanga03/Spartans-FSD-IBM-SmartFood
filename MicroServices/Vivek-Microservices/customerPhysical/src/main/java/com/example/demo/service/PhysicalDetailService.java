package com.example.demo.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.example.demo.entity.PhysicalDetail;
import com.example.demo.entity.PhysicalDetailsDto;
import com.example.demo.repo.PhysicalDetailRepository;
import com.thoughtworks.xstream.mapper.Mapper;

@Service
public class PhysicalDetailService {
   
	private PhysicalDetailRepository physicalDetailRepository; 
	private ModelMapper mapper;
   
	@Autowired
     public PhysicalDetailService(PhysicalDetailRepository physicalDetailRepository) {
	super();
	this.physicalDetailRepository = physicalDetailRepository;
	 this.mapper = new ModelMapper();
	this.mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
   }
   public PhysicalDetailsDto insertPhysicalDto(PhysicalDetailsDto physicalDetailsDto)
   {
	  
   	PhysicalDetail physicalDetail = mapper.map(physicalDetailsDto, PhysicalDetail.class);
   	physicalDetailRepository.save(physicalDetail);
   	physicalDetailsDto = mapper.map(physicalDetail, PhysicalDetailsDto.class);
    return physicalDetailsDto;
   }
   
   public PhysicalDetailsDto findByUUID(String uuid)
   {     PhysicalDetailsDto physicalDetailsDto;
	   Optional<PhysicalDetail> physicalDetail = physicalDetailRepository.findByUPuuid(uuid);
	   if(physicalDetail.isPresent())
	   {
		 physicalDetailsDto = mapper.map(physicalDetail.get(), PhysicalDetailsDto.class);
		   
	   }
	   else
	   {
		   physicalDetailsDto = null;
	   }
	   
	   return physicalDetailsDto;
   }
   public void deleteByUUID(String uuid)
   {  
      Optional<PhysicalDetail> physicalDetail = physicalDetailRepository.findByUPuuid(uuid);
     if(physicalDetail.isPresent())
     {
    	 physicalDetailRepository.delete(physicalDetail.get());
     }  
   }
   
   public PhysicalDetailsDto updatePhysicalDetail(PhysicalDetailsDto physicalDetailsDto)
   {   
	   Optional<PhysicalDetail> physicalDetail = physicalDetailRepository.findByUPuuid(physicalDetailsDto.getUPuuid());
	   if(physicalDetail.isPresent())
	   {  
		  PhysicalDetail tempPhyDetail = physicalDetail.get();
		  PhysicalDetail pDetail = mapper.map(physicalDetailsDto, PhysicalDetail.class);
		  pDetail.setId(tempPhyDetail.getId());
		  pDetail = physicalDetailRepository.save(pDetail);
		  physicalDetailsDto = mapper.map(pDetail, PhysicalDetailsDto.class);
		  return physicalDetailsDto;
	   }
	   
	   return null;
   }
   
}
