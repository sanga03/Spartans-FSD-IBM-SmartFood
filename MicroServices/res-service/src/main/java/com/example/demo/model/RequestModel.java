package com.example.demo.model;

public class RequestModel {

	private String name;
	private Long contact;
	private double rating;
	private String location;

	public RequestModel(String name, Long contact, double rating, String location) {
		super();
		this.name = name;
		this.contact = contact;
		this.rating = rating;
		this.location = location;
	}

	public RequestModel() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getContact() {
		return contact;
	}

	public void setContact(Long contact) {
		this.contact = contact;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	

	}
