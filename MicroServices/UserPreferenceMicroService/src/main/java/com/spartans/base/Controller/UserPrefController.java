package com.spartans.base.Controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;
import com.spartans.base.Model.FinalResponceModel;
import com.spartans.base.Model.RespCusine;
import com.spartans.base.Model.ResponceModelPrefCus;
import com.spartans.base.Service.UserPrefService;

@RestController
public class UserPrefController {
	@Autowired
	private UserPrefService userPrefService;
@GetMapping("/list")
public List<FinalResponceModel> getAll(){
	return userPrefService.getAlluserPrefs();
}
@GetMapping("/cus/{uUuid}")
public List<Cuisines> getByCus(@PathVariable("uUuid") String uUuid){
	return userPrefService.getAlluserPrefsbyCus(uUuid);
}
@GetMapping("/pref/{uUuid}")
public FinalResponceModel getBypref(@PathVariable("uUuid") String uUuid){
	
	FinalResponceModel model = new FinalResponceModel();
	UserPreferences userPreferences= userPrefService.getuserPrefsbyCus(uUuid);
	ResponceModelPrefCus responceModelPrefCus = new ResponceModelPrefCus();
	responceModelPrefCus.setUserPreferences(userPreferences);
ModelMapper mapper = new ModelMapper();
	Set<RespCusine> cuisines = new HashSet<RespCusine>();
	for(Cuisines cuisines2:userPrefService.getAlluserPrefsbyCus(uUuid)) {
cuisines.add(mapper.map(cuisines2, RespCusine.class));		
	}

	responceModelPrefCus.setCuisines(cuisines);
	
	model.setUUuid(userPreferences.getUUuid());
	model.setUprUuid(userPreferences.getUprUuid());
	model.setTargetWeight(userPreferences.getTargetWeight());
	model.setCategory(userPreferences.getCategory());
//	List<Cuisines> cusines = userPreferences.findAllByUserPreferencesId(userPrefRepo.findId(preference.getUUuid()));
	List<String> list= new ArrayList<String>();
	for(Cuisines cuisines1:userPrefService.getAlluserPrefsbyCus(uUuid)) {
		list.add(cuisines1.getCuisine());
	}
	model.setCusines(list);
	
	
	
	return model;
}


@PostMapping("/pushPref")
public boolean pushToUserPref(@RequestBody ResponceModelPrefCus userPreferences) {
	try {
			userPrefService.addUserPref(userPreferences.getUserPreferences());
			userPrefService.addUserCus(userPreferences.getCuisines(), userPreferences.getUserPreferences().getUUuid());
	return true;
	}catch (Exception e) {
		return false;
	}
//	return userPrefService.addUserPref(userPreferences);
}

@PostMapping("/pushCus/{uUuid}")
public boolean pushToUserPref(@PathVariable("uUuid") String uUuid,@RequestBody Set<RespCusine> cuisines) {
 try {
	 
	 userPrefService.addUserCus(cuisines, uUuid);
	 return true;
 }catch (Exception e) {
	e.printStackTrace();
	return false;
}
}

@PostMapping("updatePref/{uUuid}")
public boolean updateToPref(@PathVariable("uUuid") String uUuid,@RequestBody ResponceModelPrefCus userPreferences) {
	return userPrefService.updatepref(userPreferences, uUuid);
}
//@PostMapping("/updateCus/{uUuid}")
//public boolean updateToCus(@PathVariable("uUuid") String uUuid,@RequestBody List<Cuisines> cuisines) {
//	return userPrefService.updateUserCus(cuisines, uUuid);
//}
@GetMapping("/deletePref/{uUuid}")
public boolean deleteUserPref(@PathVariable("uUuid") String uUuid) {
	if (userPrefService.delteUserpref(uUuid)&& userPrefService.delterCus(uUuid))
		return true;
	else 
		return false;
}

@GetMapping("/deleteCus/{uUuid}")
public boolean deleteCus(@PathVariable("uUuid") String uUuid) {
	return userPrefService.delterCus(uUuid);
}

}
