package com.spartans.base.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;
import com.spartans.base.Service.UserPrefService;

@RestController
public class UserPrefController {
	@Autowired
	private UserPrefService userPrefService;
@GetMapping("/list")
public List<UserPreferences> getAll(){
	return userPrefService.getAlluserPrefs();
}
@GetMapping("/cus/{id}")
public List<Cuisines> getByCus(@PathVariable("id") String id){
	return userPrefService.getAlluserPrefsbyCus(id);
}
}
