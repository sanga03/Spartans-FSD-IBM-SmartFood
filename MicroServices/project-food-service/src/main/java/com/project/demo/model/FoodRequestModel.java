package com.project.demo.model;


public class FoodRequestModel {
	
   private String image;//stores link of the image
	
   private String name;

   private Boolean category;
   
   private String cuisine;
   
   private String rUid;

public FoodRequestModel() {
	super();
}

public FoodRequestModel(String image, String name, Boolean category, String cuisine, String rUid) {
	super();
	this.image = image;
	this.name = name;
	this.category = category;
	this.cuisine = cuisine;
	this.rUid = rUid;
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
   
     


   private Boolean category;
   
   private String cuisine;
   

}
