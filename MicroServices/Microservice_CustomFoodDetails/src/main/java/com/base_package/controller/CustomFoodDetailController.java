package com.base_package.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.base_package.DTO.CustomFoodDetailDTO;
import com.base_package.model.CustomFoodDetailRequestModel;
import com.base_package.model.CustomFoodDetailResponseModel;
import com.base_package.service.CustomFoodDetailService;

@RestController
@RequestMapping("/")
public class CustomFoodDetailController {
	@Autowired
	private CustomFoodDetailService customFoodDetailService;
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/customFoodDetails")
	public ResponseEntity<CustomFoodDetailResponseModel> create(
			@RequestBody CustomFoodDetailRequestModel customFoodDetailRequestModel) {

		modelMapper.getConfiguration().setAmbiguityIgnored(true);
		CustomFoodDetailDTO customFoodDetailDTO = modelMapper.map(customFoodDetailRequestModel,
				CustomFoodDetailDTO.class);
		customFoodDetailDTO = customFoodDetailService.createCustomFoodDetail(customFoodDetailDTO);
		CustomFoodDetailResponseModel customFoodDetailResponseModel = modelMapper.map(customFoodDetailDTO,
				CustomFoodDetailResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(customFoodDetailResponseModel);
	}

	@GetMapping("/customFoodDetails")
	public ResponseEntity<List<CustomFoodDetailResponseModel>> readAll() {
		CustomFoodDetailResponseModel customFoodDetailResponseModel;
		List<CustomFoodDetailDTO> DTOList = customFoodDetailService.readAll();
		List<CustomFoodDetailResponseModel> list = new ArrayList<CustomFoodDetailResponseModel>();
		for (CustomFoodDetailDTO customFoodDetailDTO : DTOList) {
			customFoodDetailResponseModel = modelMapper.map(customFoodDetailDTO, CustomFoodDetailResponseModel.class);
			list.add(customFoodDetailResponseModel);
		}
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@GetMapping("/customFoodDetails/{uuid}")
	public ResponseEntity<CustomFoodDetailResponseModel> readByUuid(@PathVariable("uuid") String uuid) {

		CustomFoodDetailDTO customFoodDetailDTO = customFoodDetailService.readByUuid(uuid);
		CustomFoodDetailResponseModel customFoodDetailResponseModel = modelMapper.map(customFoodDetailDTO,
				CustomFoodDetailResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(customFoodDetailResponseModel);
	}

	@PutMapping("/customFoodDetails/{uuid}")
	public ResponseEntity<CustomFoodDetailResponseModel> update(
			@RequestBody CustomFoodDetailRequestModel customFoodDetailRequestModel, @PathVariable("uuid") String uuid) {

		CustomFoodDetailDTO customFoodDetailDTO = modelMapper.map(customFoodDetailRequestModel,
				CustomFoodDetailDTO.class);
		customFoodDetailDTO = customFoodDetailService.update(uuid, customFoodDetailDTO);
		CustomFoodDetailResponseModel customFoodDetailResponseModel = modelMapper.map(customFoodDetailDTO,
				CustomFoodDetailResponseModel.class);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(customFoodDetailResponseModel);
	}

	@DeleteMapping("/customFoodDetails/{uuid}")
	public ResponseEntity<CustomFoodDetailResponseModel> delete(@PathVariable("uuid") String uuid) {

		CustomFoodDetailDTO customFoodDetailDTO = customFoodDetailService.delete(uuid);
		CustomFoodDetailResponseModel customFoodDetailResponseModel = modelMapper.map(customFoodDetailDTO,
				CustomFoodDetailResponseModel.class);
		return ResponseEntity.status(HttpStatus.GONE).body(customFoodDetailResponseModel);
	}

}
