package com.example.models;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.UUID;






public class CustomerPhysical {

     private int id;
     private String uPuuid;
     private float height;
     private float weight;
     private Date dob;
     private Gender gender;
     private float bmi;
     private float bmr;
     private int caloriesBurn;

     private CustomerAccount customer;
	public CustomerPhysical() {
		super();
	}
	public CustomerPhysical(String uPuuid, float height, float weight, Date dob, Gender gender, float bmi, float bmr,
			int caloriesBurn, CustomerAccount customer) {
		super();
		this.uPuuid = uPuuid;
		this.height = height;
		this.weight = weight;
		this.dob = dob;
		this.gender = gender;
		this.bmi = bmi;
		this.bmr = bmr;
		this.caloriesBurn = caloriesBurn;
		this.customer = customer;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getuPuuid() {
		return uPuuid;
	}
	public void setuPuuid(String uPuuid) {
		this.uPuuid = uPuuid;
	}
	public float getHeight() {
		return height;
	}
	public void setHeight(float height) {
		this.height = height;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public float getBmi() {
		return bmi;
	}
	public void setBmi(float bmi) {
		this.bmi = bmi;
	}
	public float getBmr() {
		return bmr;
	}
	public void setBmr(float bmr) {
		this.bmr = bmr;
	}
	public int getCaloriesBurn() {
		return caloriesBurn;
	}
	public void setCaloriesBurn(int caloriesBurn) {
		this.caloriesBurn = caloriesBurn;
	}
	public CustomerAccount getCustomer() {
		return customer;
	}
	public void setCustomer(CustomerAccount customer) {
		this.customer = customer;
	}
     
     
	
      
   
}