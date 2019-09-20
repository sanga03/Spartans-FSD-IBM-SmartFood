package com.example.demo.model;

import java.util.HashSet;
import java.util.Set;

import com.example.demo.entity.Food;

public class ResponseModel {
	private String name;
	private int contact;
	private int rating;
	private Set<Food> foods = new HashSet<>();
	
	public ResponseModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public ResponseModel(String name, int contact, int rating, Set<Food> foods) {
		super();
		this.name = name;
		this.contact = contact;
		this.rating = rating;
		this.foods = foods;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getContact() {
		return contact;
	}

	public void setContact(int contact) {
		this.contact = contact;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public Set<Food> getFoods() {
		return foods;
	}

	public void setFoods(Set<Food> foods) {
		this.foods = foods;
	}
	
	

	
}
