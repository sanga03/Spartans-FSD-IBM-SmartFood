package com.project.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FoodDTO {
	private int id;
	
	private String fUid;//generated randomly 
	
	private String image;//stores link of the image
	
	private String name;
	
	private Boolean category;
	
	private String cuisine; 
	
	private String rUid;//dummy restaurant id

	public FoodDTO(int id, String fUid, String image, String name, Boolean category, String cuisine, String rUid) {
		super();
		this.id = id;
		this.fUid = fUid;
		this.image = image;
		this.name = name;
		this.category = category;
		this.cuisine = cuisine;
		this.rUid = rUid;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getfUid() {
		return fUid;
	}

	public void setfUid(String fUid) {
		this.fUid = fUid;
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

	public String getrUid() {
		return rUid;
	}

	public void setrUid(String rUid) {
		this.rUid = rUid;
	}

	public FoodDTO() {
		super();
	}
	
	
}
