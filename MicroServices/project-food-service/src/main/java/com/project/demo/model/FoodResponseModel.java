package com.project.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class FoodResponseModel {
	
	
	private String FUid;//generated randomly 
	
	private String image;//stores link of the image
	
	private String name;
	
	private Boolean category;
	
	private String cuisine;
	
	private String RUid;//dummy restaurant id	


	public String getFUid() {
		return FUid;
	}

	public void setFUid(String fUid) {
		FUid = fUid;
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

	public String getRUid() {
		return RUid;
	}

	public void setRUid(String rUid) {
		RUid = rUid;
	}

	public FoodResponseModel(String fUid, String image, String name, Boolean category, String cuisine,
			String rUid) {
		super();
		FUid = fUid;
		this.image = image;
		this.name = name;
		this.category = category;
		this.cuisine = cuisine;
		RUid = rUid;
	}

	public FoodResponseModel() {
		super();
	}
	

}
