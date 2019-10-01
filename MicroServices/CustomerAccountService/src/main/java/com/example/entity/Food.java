package com.example.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Food {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "fuid")
	private String fUid;
	
	@Column(name = "imageLink")
	private String image;//stores link of the image
	
	@Column(name = "name")
	private String name;

	@Column(name = "category")
	private Boolean category;
	
	@Column(name = "cuisine")
	private String cuisine;
	
	@Column(name = "rUid")
	private String rUid;//dummy restaurant id
	public Food() {
		super();
	}

	public Food(String image, String name, Boolean category, String cuisine, String rUid) {
		super();
		this.image = image;
		this.name = name;
		this.category = category;
		this.cuisine = cuisine;
		this.rUid = rUid;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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
	
	//sorting classes
	

	
}