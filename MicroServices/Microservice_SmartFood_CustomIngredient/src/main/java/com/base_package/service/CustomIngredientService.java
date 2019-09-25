package com.base_package.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.base_package.dto.CustomIngredientDTO;
import com.base_package.entity.CustomIngredient;
import com.base_package.repository.CustomIngredientRepository;

@Service
public class CustomIngredientService {
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private CustomIngredientRepository customIngredientRepository;
	
	public CustomIngredientDTO create(CustomIngredientDTO customIngredientDTO) {
		CustomIngredient customIngredient = modelMapper.map(customIngredientDTO, CustomIngredient.class);
		customIngredient.setUuid("CI_"+UUID.randomUUID().toString());
		customIngredientRepository.save(customIngredient);
		customIngredientDTO = modelMapper.map(customIngredient, CustomIngredientDTO.class);
		return customIngredientDTO;
	}
	
	public List<CustomIngredientDTO> readAll(){
		CustomIngredientDTO customIngredientDTO;
		List<CustomIngredient> list = customIngredientRepository.findAll();
		List<CustomIngredientDTO> DTOList = new ArrayList<CustomIngredientDTO>();
		for(CustomIngredient customIngredient:list) {
			customIngredientDTO = modelMapper.map(customIngredient, CustomIngredientDTO.class);
			DTOList.add(customIngredientDTO);
		}
		return DTOList;
	}
	
	public CustomIngredientDTO readByUuid(String uuid) {
		CustomIngredient customIngredient = customIngredientRepository.findById(customIngredientRepository.customGetIdFromUuid(uuid)).get();
		CustomIngredientDTO customIngredientDTO = modelMapper.map(customIngredient, CustomIngredientDTO.class);
		return customIngredientDTO;
	}
	
	public CustomIngredientDTO update(String uuid, CustomIngredientDTO customIngredientDTO) {
		
		CustomIngredient customIngredient = customIngredientRepository.findById(customIngredientRepository.customGetIdFromUuid(uuid)).get();
		customIngredient.setDetails(customIngredientDTO);
		customIngredientDTO = modelMapper.map(customIngredient, CustomIngredientDTO.class);
		customIngredientRepository.save(customIngredient);
		return customIngredientDTO;
	}
	
	public CustomIngredientDTO delete(String uuid) {
		
		CustomIngredient customIngredient = customIngredientRepository.findById(customIngredientRepository.customGetIdFromUuid(uuid)).get();
		CustomIngredientDTO customIngredientDTO = modelMapper.map(customIngredient, CustomIngredientDTO.class);
		customIngredientRepository.delete(customIngredient);
		return customIngredientDTO;
		
	}
}
