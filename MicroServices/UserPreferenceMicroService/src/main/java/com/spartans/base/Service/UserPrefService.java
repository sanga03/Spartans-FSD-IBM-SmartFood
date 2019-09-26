package com.spartans.base.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;
import com.spartans.base.Model.FinalResponceModel;
import com.spartans.base.Model.RespCusine;
import com.spartans.base.Model.ResponceModelPrefCus;
import com.spartans.base.Repo.CuisineRepo;
import com.spartans.base.Repo.UserPrefRepo;

@Service
public class UserPrefService {
	@Autowired
	UserPrefRepo userPrefRepo;
	@Autowired
	CuisineRepo cuisineRepo;

	public List<FinalResponceModel> getAlluserPrefs() {
	List<FinalResponceModel> models = new ArrayList<FinalResponceModel>();
		
	List<UserPreferences> preferences=	userPrefRepo.findAll();
	for(UserPreferences preference:preferences) {
		FinalResponceModel model = new FinalResponceModel();
		model.setUUuid(preference.getUUuid());
		model.setUprUuid(preference.getUprUuid());
		model.setTargetWeight(preference.getTargetWeight());
		model.setCategory(preference.getCategory());
		List<Cuisines> cusines = cuisineRepo.findAllByUserPreferencesId(userPrefRepo.findId(preference.getUUuid()));
		List<String> list= new ArrayList<String>();
		for(Cuisines cuisines:cusines) {
			list.add(cuisines.getCuisine());
		}
		model.setCusines(list);
	models.add(model);
	}
	
	return models;
	
	
	}

	public List<Cuisines> getAlluserPrefsbyCus(String id) {
		return cuisineRepo.findAllByUserPreferencesId(userPrefRepo.findId(id));
	}

	public boolean addUserPref(UserPreferences userPref) {
		try {
			userPrefRepo.save(userPref);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean addUserCus(Set<RespCusine> set, String uUuid) {
		int counter = 1;
		try {
			counter = cuisineRepo.findTopByOrderByIdDesc().getId();
		} catch (Exception e) {
			counter = 1;
		}
		ModelMapper mapper = new ModelMapper();
		try {
			for (RespCusine cuisineR : set) {
				Cuisines cuisine = mapper.map(cuisineR, Cuisines.class);
				Integer id = userPrefRepo.findId(uUuid);
				cuisine.setUUuid(uUuid);
				System.out.println(id);
				cuisine.setId(++counter);
				cuisine.setUserPreferences(userPrefRepo.findById(id).get());
				System.out.println(cuisine);
				cuisineRepo.saveAndFlush(cuisine);
				System.out.println(cuisineRepo.findTopByOrderByIdDesc());
				counter = cuisineRepo.findTopByOrderByIdDesc().getId();

			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	public boolean updatepref(UserPreferences userPreferences, String uUuid) {
		try {
			int id = userPrefRepo.findId(uUuid);
			userPreferences.setId(id);
			System.out.println(id);
			userPrefRepo.save(userPreferences);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
			// TODO: handle exception
		}
	}

	public boolean updateUserCus(Set<RespCusine> set, String uUuid) {
		try {
			cuisineRepo.deleteAllByUUuid(uUuid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return addUserCus(set, uUuid);
	}

	public boolean delteUserpref(String uUuid) {
		int id = userPrefRepo.findId(uUuid);
		System.out.println(id);
		UserPreferences userPreferences = userPrefRepo.findById(id).get();
		System.out.println(userPreferences.getCuisines());
		userPrefRepo.deleteByUUuid(uUuid);
		return true;
	}

	public boolean delterCus(String uUuid) {
		cuisineRepo.deleteAllByUUuid(uUuid);
		return true;

	}

	public UserPreferences getuserPrefsbyCus(String uUuid) {
		return userPrefRepo.findById(userPrefRepo.findId(uUuid)).get();
	}

	public boolean updatepref(ResponceModelPrefCus responceModelPrefCus, String uUuid) {
		try {
			UserPreferences userPreferences = responceModelPrefCus.getUserPreferences();
			int id = userPrefRepo.findId(uUuid);
			userPreferences.setId(id);
			System.out.println(id);
			System.out.println(userPreferences);
			userPrefRepo.save(userPreferences);
//			updateUserCus(responceModelPrefCus.getCuisines(), userPreferences.getUUuid());
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
			// TODO: handle exception
		}
	}
}
