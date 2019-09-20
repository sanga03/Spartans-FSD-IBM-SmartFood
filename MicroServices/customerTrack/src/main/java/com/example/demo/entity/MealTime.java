package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public enum MealTime { 
	
	BREAKFAST(0),
	LUNCH(1),
	DINNER(2);
	
	private int code;

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
	
   
	
	

}
