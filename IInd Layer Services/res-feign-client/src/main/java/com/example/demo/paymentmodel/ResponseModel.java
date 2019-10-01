package com.example.demo.paymentmodel;

	

public class ResponseModel {  
	
	private String p_uuid;
	private String restaurantName;
	private String userName;
	private float amount;
	
	public String getP_uuid() {
		return p_uuid;
	}
	public void setP_uuid(String p_uuid) {
		this.p_uuid = p_uuid;
	}
	public String getRestaurantName() {
		return restaurantName;
	}
	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public float getAmount() {
		return amount;
	}
	public void setAmount(float amount) {
		this.amount = amount;
	}
	public ResponseModel(String p_uuid, String restaurantName, String userName, float amount) {
		super();
		this.p_uuid = p_uuid;
		this.restaurantName = restaurantName;
		this.userName = userName;
		this.amount = amount;
	}
	

}
