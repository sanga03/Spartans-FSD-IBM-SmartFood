package com.example.models;

public class FoodRequestModel {
	
	   private String image;
		
	   private String name;

	   private Boolean category;
	   
	   private String cuisine;

	public FoodRequestModel() {
		super();
	}

	public FoodRequestModel(String image, String name, Boolean category, String cuisine) {
		super();
		this.image = image;
		this.name = name;
		this.category = category;
		this.cuisine = cuisine;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getCategory() {
		return category;
	}

	public void setCategory(Boolean category) {
		this.category = category;
	}

	public String getCuisine() {
		return cuisine;
	}

	public void setCuisine(String cuisine) {
		this.cuisine = cuisine;
	}
	   
	}