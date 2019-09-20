package com.spartans.base.Entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

@Entity
@Data
public class UserPreferences {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//Auto Generated id
	int id;
	//uUuid same as user account table
	String uUuid;
	//An auto Generated uuid for userPreference
	String uprUuid;
	//His favorite category (Veg/non-veg)
	String category;
	//if he wants to reduce weight
	Float targetWeight;
	@OneToMany
	Set<Cuisines> cuisines;
	
}
