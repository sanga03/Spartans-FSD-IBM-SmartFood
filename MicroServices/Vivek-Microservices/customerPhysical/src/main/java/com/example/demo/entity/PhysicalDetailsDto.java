package com.example.demo.entity;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.UUID;

import javax.persistence.OneToMany;
import javax.persistence.OneToOne;




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
    private float caloriesBurn;
    private CustomerAccount customerAccount;
	public PhysicalDetailsDto(float height, float weight, long dob,float caloriesBurn,int gender) {
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
		Date d = new Date();
        int age = (int) ((d.getTime()-this.dob.getTime())/(31556952000l));
		 
		if(this.gender.getGender()==Gender.MALE.getGender())
		{
			this.bmr = (float) ((10 * this.weight) + (6.25 * this.height) - (5 * age) + 5);
		}
		else
		{  
			this.bmr = (float) ((10 * this.weight) + (6.25 * this.height) - (5 * age) - 161);
		} 
		
		this.bmr = this.bmr * this.caloriesBurn;
		
	
	}
     
}
