package com.spartans.base.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;
import com.spartans.base.Model.FinalReqModel;
import com.spartans.base.Model.FinalResponceModel;
import com.spartans.base.Service.UserPrefService;
@CrossOrigin
@RestController
public class UserPrefController {
	@Autowired
	private UserPrefService userPrefService;

	@GetMapping("/list")
	public List<FinalResponceModel> getAll() {
		return userPrefService.getAlluserPrefs();
	}

	@GetMapping("/cus/{uUuid}")
	public List<Cuisines> getByCus(@PathVariable("uUuid") String uUuid) {
		return userPrefService.getAlluserPrefsbyCus(uUuid);
	}

	@GetMapping("/pref/{uUuid}")
	public FinalResponceModel getBypref(@PathVariable("uUuid") String uUuid) {

		FinalResponceModel model = new FinalResponceModel();
		UserPreferences userPreferences = userPrefService.getuserPrefsbyCus(uUuid);

		model.setUUuid(userPreferences.getUUuid());
		model.setUprUuid(userPreferences.getUprUuid());
		model.setTargetWeight(userPreferences.getTargetWeight());
		model.setCategory(userPreferences.getCategory());
		model.setTargetDate(userPreferences.getTargetDate().getTime());
		model.setStartDate(userPreferences.getStartDate().getTime());
		List<String> list = new ArrayList<String>();
		for (Cuisines cuisines1 : userPrefService.getAlluserPrefsbyCus(uUuid)) {
			list.add(cuisines1.getCuisine());
		}
		model.setCusines(list);

		return model;
	}

	@PostMapping("/pushPref")
	public boolean pushToUserPref(@RequestBody FinalReqModel finalReqModel) {
		try {
			System.out.println(finalReqModel);
			UserPreferences userPreferences = new UserPreferences();
			userPreferences.setCategory(finalReqModel.getCategory());
			userPreferences.setTargetWeight(finalReqModel.getTargetWeight());
			userPreferences.setUUuid(finalReqModel.getUUuid());
			Date date = new Date(finalReqModel.getTargetDate());
			userPreferences.setTargetDate(date);
			date = new Date(finalReqModel.getStartDate());
			userPreferences.setStartDate(date);
			userPreferences.setUprUuid("UP" + Math.random() * 10000);
			System.out.println(finalReqModel.getUUuid());
			System.out.println(userPreferences.getUUuid());
			userPrefService.addUserPref(userPreferences);
			Set<Cuisines> cuisinesl = new HashSet<Cuisines>();
			List<String> list = finalReqModel.getCusines();
			for (String lis : list) {
				Cuisines cuisines = new Cuisines();
				cuisines.setUUuid(userPreferences.getUUuid());
				System.out.println(cuisines.getUUuid());
				cuisines.setUserPreferences(userPreferences);
				cuisines.setCuisine(lis);
				cuisinesl.add(cuisines);

			}
			userPrefService.addUserCus(cuisinesl, userPreferences.getUUuid());
			return true;
		} catch (Exception e) {
			return false;
		}
//	return userPrefService.addUserPref(userPreferences);
	}


	@PostMapping("updatePref/{uUuid}")
	public boolean updateToPref(@PathVariable("uUuid") String uUuid, @RequestBody FinalReqModel finalReqModel) {
		return userPrefService.updatepref(finalReqModel, uUuid);
	}

	@GetMapping("/deletePref/{uUuid}")
	public boolean deleteUserPref(@PathVariable("uUuid") String uUuid) {
		if (userPrefService.delteUserpref(uUuid))
			return true;
		else
			return false;
	}

	@GetMapping("/deleteCus/{uUuid}")
	public boolean deleteCus(@PathVariable("uUuid") String uUuid) {
		return userPrefService.delterCus(uUuid);
	}

}
