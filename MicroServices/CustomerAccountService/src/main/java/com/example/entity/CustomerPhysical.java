package com.example.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

public class CustomerPhysical {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private double height;   //meter
	private double weight;   //kg
	private String DOB;
	private double bmi;
	private double bmr;
	private double calories_burnt;
	@OneToOne(mappedBy="cp")
	private CustomerAccount ca;
	public CustomerPhysical(double height, double weight, String DOB, double calories_burnt) {
		super();
		this.height = height;
		this.weight = weight;
		this.DOB = DOB;
		this.bmi=weight/(height*height);
		this.bmr = 66.47 + (13.7 * weight) + (5 * height)-(6.8 * 21);
		this.calories_burnt = calories_burnt;
		
	}
	public CustomerPhysical() {
		super();
	}
	
	@JsonIgnore
public CustomerAccount getCa() {
		return ca;
	}
	public void setCa(CustomerAccount ca) {
		this.ca = ca;
	}
public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public double getHeight() {
		return height;
	}
	public void setHeight(double height) {
		this.height = height;
	}
	public double getWeight() {
		return weight;
	}
	public void setWeight(double weight) {
		this.weight = weight;
	}
	public String getDOB() {
		return DOB;
	}
	public void setDOB(String dOB) {
		DOB = dOB;
	}
	public double getBmi() {
		return bmi;
	}
	public void setBmi(double bmi) {
		this.bmi = bmi;
	}
	public double getBmr() {
		return bmr;
	}
	public void setBmr(double bmr) {
		this.bmr = bmr;
	}
	public double getCalories_burnt() {
		return calories_burnt;
	}
	public void setCalories_burnt(double calories_burnt) {
		this.calories_burnt = calories_burnt;
	}
	
	
}
