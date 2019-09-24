package com.example.demo.model;

public class RequestModel {

	private String name;
	private int contact;
	private int rating;
	

	public RequestModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RequestModel(String name, int contact, int rating) {
		super();
		this.name = name;
		this.contact = contact;
		this.rating = rating;
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
