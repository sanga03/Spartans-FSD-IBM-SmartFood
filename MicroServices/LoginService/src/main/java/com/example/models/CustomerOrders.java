package com.example.models;


import com.fasterxml.jackson.annotation.JsonIgnore;


public class CustomerOrders {

	private Integer id;
	private String date;
	private String restaurant_id;
	private CustomerAccount ca;
	public CustomerOrders() {
		super();
	}
	public CustomerOrders(String date, String restaurant_id) {
		super();
		this.date = date;
		this.restaurant_id = restaurant_id;
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
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getRestaurant_id() {
		return restaurant_id;
	}
	public void setRestaurant_id(String restaurant_id) {
		this.restaurant_id = restaurant_id;
	};
	
}
