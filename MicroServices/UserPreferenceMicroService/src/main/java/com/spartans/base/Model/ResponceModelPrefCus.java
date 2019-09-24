package com.spartans.base.Model;

import java.util.Set;

import com.spartans.base.Entity.Cuisines;
import com.spartans.base.Entity.UserPreferences;

import lombok.Data;

@Data
public class ResponceModelPrefCus {
private UserPreferences userPreferences;
	private Set<RespCusine> cuisines;
}
