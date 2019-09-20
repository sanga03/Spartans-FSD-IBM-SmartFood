package com.example.demo.requestAndResponseModel;

import java.util.Date;

import com.example.demo.entity.Gender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseModel {
	private String uPuuid;
	 private float height;
	    private float weight;
	    private Date dob;
	    private Gender gender;
	    private float bmi;
	    private float bmr;
	    private int caloriesBurn;
}
