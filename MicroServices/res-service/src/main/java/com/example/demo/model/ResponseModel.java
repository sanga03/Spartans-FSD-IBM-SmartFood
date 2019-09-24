package com.example.demo.model;

public class ResponseModel {
	private String name;
	private int contact;
	private int rating;
	private String resId;

	public ResponseModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getResId() {
		return resId;
	}

	public void setResId(String resId) {
		this.resId = resId;
	}

	public ResponseModel(String name, int contact, int rating, String resId) {
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

}
