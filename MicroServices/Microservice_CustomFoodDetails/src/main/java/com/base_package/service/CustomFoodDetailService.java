package com.base_package.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.base_package.DTO.CustomFoodDetailDTO;
import com.base_package.entity.CustomFoodDetail;
import com.base_package.repository.CustomFoodDetailRepository;

@Service
public class CustomFoodDetailService {
	
	@Autowired
	private CustomFoodDetailRepository customFoodDetailRepository;
	@Autowired
	private ModelMapper modelMapper;
	
	public CustomFoodDetailDTO createCustomFoodDetail(CustomFoodDetailDTO customFoodDetailDTO) {
		CustomFoodDetail customFoodDetail = modelMapper.map(customFoodDetailDTO, CustomFoodDetail.class);
		customFoodDetail.setUuid("CFD_"+UUID.randomUUID().toString());
		customFoodDetailRepository.save(customFoodDetail);
		customFoodDetailDTO = modelMapper.map(customFoodDetail, CustomFoodDetailDTO.class);
		return customFoodDetailDTO;
	}
	
	public List<CustomFoodDetailDTO> readAll(){
		CustomFoodDetailDTO customFoodDetailDTO;
		List<CustomFoodDetailDTO> DTOList = new ArrayList<CustomFoodDetailDTO>();
		List<CustomFoodDetail> list = customFoodDetailRepository.findAll();
		for(CustomFoodDetail customFoodDetail: list) {
			customFoodDetailDTO = modelMapper.map(customFoodDetail, CustomFoodDetailDTO.class);
			DTOList.add(customFoodDetailDTO);
		}
		return DTOList;
	}
	
	public CustomFoodDetailDTO readByUuid(String uuid) {
		CustomFoodDetail customFoodDetail = customFoodDetailRepository.findByUuid(uuid).get(0);
		CustomFoodDetailDTO customFoodDetailDTO = modelMapper.map(customFoodDetail, CustomFoodDetailDTO.class);
		return customFoodDetailDTO;
	}
	
	public CustomFoodDetailDTO update(String uuid, CustomFoodDetailDTO customFoodDetailDTO) {
		CustomFoodDetail customFoodDetail = customFoodDetailRepository.findByUuid(uuid).get(0);
		customFoodDetail.setDetails(customFoodDetailDTO);
		customFoodDetailDTO = modelMapper.map(customFoodDetail, CustomFoodDetailDTO.class);
		customFoodDetailRepository.save(customFoodDetail);
		return customFoodDetailDTO;
	}
	
	public CustomFoodDetailDTO delete(String uuid) {
		CustomFoodDetail customFoodDetail = customFoodDetailRepository.findByUuid(uuid).get(0);
		CustomFoodDetailDTO customFoodDetailDTO = modelMapper.map(customFoodDetail, CustomFoodDetailDTO.class);
		customFoodDetailRepository.delete(customFoodDetail);
		return customFoodDetailDTO;
	}
}
