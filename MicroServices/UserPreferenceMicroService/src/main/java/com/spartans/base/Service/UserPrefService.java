package com.spartans.base.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;
import com.spartans.base.Repo.CuisineRepo;
import com.spartans.base.Repo.UserPrefRepo;

@Service
public class UserPrefService {
@Autowired
UserPrefRepo userPrefRepo;
@Autowired
CuisineRepo cuisineRepo;
public List<UserPreferences> getAlluserPrefs(){
return userPrefRepo.findAll();
}
public List<Cuisines> getAlluserPrefsbyCus(String id){
return cuisineRepo.findAllByUserPreferencesId(userPrefRepo.findId(id));
}

public boolean addUserPref(UserPreferences userPref) {
	try {
		userPrefRepo.save(userPref);
	return true;
	}catch(Exception e) {
		e.printStackTrace();
		return false;
	}
}

}
