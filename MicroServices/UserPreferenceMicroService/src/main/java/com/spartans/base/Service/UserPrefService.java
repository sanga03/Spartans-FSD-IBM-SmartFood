package com.spartans.base.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;
import com.spartans.base.Model.FinalReqModel;
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
		Date date = new Date(finalReqModel.getTargetDate());
		model.setTargetDate(date);
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

	public boolean addUserCus(Set<Cuisines> cuisinesl, String uUuid) {
		int counter = 1;
		try {
			counter = cuisineRepo.findTopByOrderByIdDesc().getId();
		} catch (Exception e) {
			counter = 1;
		}
//		ModelMapper mapper = new ModelMapper();
		try {
			for (Cuisines cuisine : cuisinesl) {
//				Cuisines cuisine = mapper.map(cuisineR, Cuisines.class);
//				Integer id = userPrefRepo.findId(uUuid);
//				cuisine.setUUuid(uUuid);
//				System.out.println(id);
				cuisine.setId(++counter);
//				cuisine.setUserPreferences(userPrefRepo.findById(id).get());
//				System.out.println(cuisine);
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

	public boolean updatepref(FinalReqModel finalReqModel, String uUuid) {
		try {
			UserPreferences userPreferences = new UserPreferences();
			userPreferences.setTargetWeight(finalReqModel.getTargetWeight());
			userPreferences.setCategory(finalReqModel.getCategory());
			userPreferences.setUprUuid(finalReqModel.getUprUuid());
			userPreferences.setUUuid(finalReqModel.getUUuid());
			userPreferences.setTargetDate(finalReqModel.getTargetDate());
			int id = userPrefRepo.findId(uUuid);
//			userPreferences.setId(id);
		userPrefRepo.deleteById(id);
			System.out.println(id);
			System.out.println(userPreferences);
			
//			cuisineRepo.deleteAllByUUuid(uUuid);
					
			Set<Cuisines> cuisinesl = new HashSet<Cuisines>();
			List<String> list = finalReqModel.getCusines();
			for (String lis : list) {
				Cuisines cuisines=new Cuisines();
				cuisines.setUUuid(userPreferences.getUUuid());
				System.out.println(cuisines.getUUuid());
				cuisines.setUserPreferences(userPreferences);
				cuisines.setCuisine(lis);
				cuisinesl.add(cuisines);
				
			}
			userPrefRepo.save(userPreferences);
			addUserCus(cuisinesl, uUuid);
			userPreferences.setCuisines(cuisinesl);
			
			
//		
			
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

//	public boolean updatepref(ResponceModelPrefCus responceModelPrefCus, String uUuid) {
//		try {
//			UserPreferences userPreferences = new UserPreferences();
//			int id = userPrefRepo.findId(uUuid);
//	     	System.out.println(id);
//			userPreferences.setId(id);
//			System.out.println(id);
//			System.out.println(userPreferences);
//			userPrefRepo.save(userPreferences);
////			updateUserCus(responceModelPrefCus.getCuisines(), userPreferences.getUUuid());
//			return true;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return false;
//			// TODO: handle exception
//		}
//	}
}
