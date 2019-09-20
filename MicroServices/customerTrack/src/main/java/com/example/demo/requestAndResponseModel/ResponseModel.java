package com.example.demo.requestAndResponseModel;

import java.util.Date;

import com.example.demo.entity.MealTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseModel {
	private String utUuid;
	private Date tackingDate;
	private MealTime mealTime;
	private int calories;
}
