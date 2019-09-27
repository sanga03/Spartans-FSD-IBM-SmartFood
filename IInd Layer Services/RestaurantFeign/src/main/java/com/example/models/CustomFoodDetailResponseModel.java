package com.example.models;
public class CustomFoodDetailResponseModel {
	private String uuid;
	private String quantity;
	private String imageLink;
	private Double price;
	private Integer rating;
	private String foodUuid;
	private String restaurantUuid;
	public CustomFoodDetailResponseModel() {
		super();
	}
	public CustomFoodDetailResponseModel(String uuid, String quantity, String imageLink, Double price, Integer rating,
			String foodUuid, String restaurantUuid) {
		super();
		this.uuid = uuid;
		this.quantity = quantity;
		this.imageLink = imageLink;
		this.price = price;
		this.rating = rating;
		this.foodUuid = foodUuid;
		this.restaurantUuid = restaurantUuid;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getImageLink() {
		return imageLink;
	}
	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Integer getRating() {
		return rating;
	}
	public void setRating(Integer rating) {
		this.rating = rating;
	}
	public String getFoodUuid() {
		return foodUuid;
	}
	public void setFoodUuid(String foodUuid) {
		this.foodUuid = foodUuid;
	}
	public String getRestaurantUuid() {
		return restaurantUuid;
	}
	public void setRestaurantUuid(String restaurantUuid) {
		this.restaurantUuid = restaurantUuid;
	}
	
	
}