package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerPhysicalResponseModel {
	private String uPuuid;
	private float height;
	private float weight;
	private String dob;
	private String gender;
	private float bmi;
	private float bmr;
	private int caloriesBurn;
}
