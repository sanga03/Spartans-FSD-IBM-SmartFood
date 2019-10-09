package com.example.demo.entity;

import java.util.Date;
import java.util.UUID;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomerTrackDto {
   
	private String utUuid;
	private Date tackingDate;
	private MealTime mealTime;
	private int calories;
	private CustomerAccount customerAccount;
	public CustomerTrackDto(long tackingDate, int mealTime, int calories) {
		super();
		this.tackingDate = new Date(tackingDate);
		if(mealTime == 0)
		{
			this.mealTime = MealTime.BREAKFAST;
			
		}
		else if(mealTime ==1)
		{
			this.mealTime = MealTime.LUNCH;
		}
		else
		{
			this.mealTime = MealTime.DINNER;
		}
		this.calories = calories;
		this.utUuid = "UT"+UUID.randomUUID().toString();
	}
	
}
