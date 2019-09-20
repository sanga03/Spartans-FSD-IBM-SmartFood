package com.example.demo.requestAndResponseModel;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestModel {
   
	private float height;
	private float weight;
	private long dob;
	private int caloriesBurn;
	private int gender;
	
}
