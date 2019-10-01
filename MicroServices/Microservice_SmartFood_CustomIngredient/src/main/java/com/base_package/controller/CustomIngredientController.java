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

import com.base_package.dto.CustomIngredientDTO;
import com.base_package.model.CustomIngredientRequestModel;
import com.base_package.model.CustomIngredientResponseModel;
import com.base_package.service.CustomIngredientService;

@RestController
@RequestMapping("/")
public class CustomIngredientController {
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private CustomIngredientService customIngredientService;

	@PostMapping("/customIngredients")
	public ResponseEntity<CustomIngredientResponseModel> create(
			@RequestBody CustomIngredientRequestModel customIngredientRequestModel) {

		//modelMapper.getConfiguration().setAmbiguityIgnored(true);
		CustomIngredientDTO customIngredientDTO = modelMapper.map(customIngredientRequestModel,
				CustomIngredientDTO.class);
		customIngredientDTO = customIngredientService.create(customIngredientDTO);
		CustomIngredientResponseModel customIngredientResponseModel = modelMapper.map(customIngredientDTO,
				CustomIngredientResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(customIngredientResponseModel);
	}

	@GetMapping("/customIngredients")
	public ResponseEntity<List<CustomIngredientResponseModel>> readAll() {
		CustomIngredientResponseModel customIngredientResponseModel;
		List<CustomIngredientDTO> DTOList = customIngredientService.readAll();
		List<CustomIngredientResponseModel> list = new ArrayList<CustomIngredientResponseModel>();
		for(CustomIngredientDTO customIngredientDTO:DTOList) {
			customIngredientResponseModel = modelMapper.map(customIngredientDTO, CustomIngredientResponseModel.class);
			list.add(customIngredientResponseModel);
		}
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@GetMapping("/customIngredients/{uuid}")
	public ResponseEntity<CustomIngredientResponseModel> readByUuid(@PathVariable("uuid") String uuid) {
		CustomIngredientDTO customIngredientDTO = customIngredientService.readByUuid(uuid);
		CustomIngredientResponseModel customIngredientResponseModel = modelMapper.map(customIngredientDTO,
				CustomIngredientResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(customIngredientResponseModel);
	}

	@PutMapping("/customIngredients/{uuid}")
	public ResponseEntity<CustomIngredientResponseModel> update(@PathVariable("uuid") String uuid,
			@RequestBody CustomIngredientRequestModel customIngredientRequestModel) {

		CustomIngredientDTO customIngredientDTO = modelMapper.map(customIngredientRequestModel,
				CustomIngredientDTO.class);
		customIngredientDTO = customIngredientService.update(uuid, customIngredientDTO);
		CustomIngredientResponseModel customIngredientResponseModel = modelMapper.map(customIngredientDTO,
				CustomIngredientResponseModel.class);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(customIngredientResponseModel);
	}

	@DeleteMapping("/customIngredients/{uuid}")
	public ResponseEntity<CustomIngredientResponseModel> delete(@PathVariable("uuid") String uuid) {
		CustomIngredientDTO customIngredientDTO = customIngredientService.delete(uuid);
		CustomIngredientResponseModel customIngredientResponseModel = modelMapper.map(customIngredientDTO,
				CustomIngredientResponseModel.class);
		return ResponseEntity.status(HttpStatus.GONE).body(customIngredientResponseModel);
	}
}
