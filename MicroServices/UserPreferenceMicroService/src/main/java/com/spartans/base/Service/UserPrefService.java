package com.spartans.base.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;
import com.spartans.base.Model.FinalReqModel;
import com.spartans.base.Model.FinalResponceModel;
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

		List<UserPreferences> preferences = userPrefRepo.findAll();
		for (UserPreferences preference : preferences) {
			FinalResponceModel model = new FinalResponceModel();
			model.setUUuid(preference.getUUuid());
			model.setUprUuid("UP" + Math.random() * 10000);
			model.setTargetDate(preference.getTargetDate().getTime());
			model.setUprUuid(preference.getUprUuid());
			model.setTargetWeight(preference.getTargetWeight());
			model.setCategory(preference.getCategory());
			model.setStartDate(preference.getStartDate().getTime());
			List<Cuisines> cusines = cuisineRepo.findAllByUserPreferencesId(userPrefRepo.findId(preference.getUUuid()));
			List<String> list = new ArrayList<String>();
			for (Cuisines cuisines : cusines) {
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
			Date date = new Date(finalReqModel.getTargetDate());
			userPreferences.setTargetDate(date);
			date = new Date(finalReqModel.getStartDate());
			userPreferences.setStartDate(date);
			try {
			cuisineRepo.deleteAllByUUuid(uUuid);
			}catch (Exception e) {
				System.out.println("ignoring delete");
			}
			int id = userPrefRepo.findId(uUuid);
//			userPreferences.setId(id);
			userPrefRepo.deleteById(id);
			System.out.println(id);
			System.out.println(userPreferences);

			

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
//			userPreferences.setCuisines(cuisinesl);

			userPrefRepo.save(userPreferences);
			addUserCus(cuisinesl, uUuid);
//			userPreferences.setCuisines(cuisinesl);

//		

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			return false;
			// TODO: handle exception
		}
	}

	public boolean delteUserpref(String uUuid) {
		int id = userPrefRepo.findId(uUuid);
		System.out.println(id);
		UserPreferences userPreferences = userPrefRepo.findById(id).get();
		System.out.println(userPreferences);
		delterCus(uUuid);
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
