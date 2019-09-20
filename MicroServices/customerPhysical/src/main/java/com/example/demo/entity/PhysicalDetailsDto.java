package com.example.demo.entity;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.UUID;

import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.joda.time.Years;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalDetailsDto {
	private String uPuuid;
    private float height;
    private float weight;
    private Date dob;
    private Gender gender;
    private float bmi;
    private float bmr;
    private int caloriesBurn;
    private Customer customer;
	public PhysicalDetailsDto(float height, float weight, long dob,int caloriesBurn,int gender) {
		super();
		this.height = height;
		this.weight = weight;
		this.dob = new Date(dob);
		this.caloriesBurn = caloriesBurn;

		if(gender==0)
		{
			this.gender = Gender.MALE;
		}
		else
		{
			this.gender = Gender.FEMALE;
		}
		this.bmi = (weight/(height * height)) * 10000;
		this.uPuuid = "UP"+UUID.randomUUID().toString();
        LocalDate today = LocalDate.now();
        LocalDate birthDay = LocalDate.of(this.dob.getYear(), this.dob.getMonth(), this.dob.getDate());

			Period age = Period.between(birthDay, today);
		 
		if(this.gender.getGender()==Gender.MALE.getGender())
		{
			this.bmr = (float) ((10 * this.weight) + (6.25 * this.height) - (5 * age.getYears()) + 5);
		}
		else
		{  this.bmr = age.getYears();
			//this.bmr = (float) ((10 * this.weight) + (6.25 * this.height) - (5 * age.getYears()) - 161);
		}
		
	
	}
     
}
