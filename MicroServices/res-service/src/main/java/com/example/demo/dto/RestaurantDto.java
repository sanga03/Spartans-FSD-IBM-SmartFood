package com.example.demo.dto;

public class RestaurantDto {
	private String name;
	private int contact;
	private int rating;
	private String resId;

	public RestaurantDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RestaurantDto(String name, int contact, int rating, String resId) {
		super();
		this.name = name;
		this.contact = contact;
		this.rating = rating;
		this.resId = resId;

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

	public String getRuid() {
		return resId;
	}

	public void setRuid(String resId) {
		this.resId = resId;
	}

}
