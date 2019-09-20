package com.example.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class ResponseModel {
	private String name;
	private String email;
	private String phone;
	public ResponseModel(String name, String email, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
	}
	public ResponseModel() {
		super();
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
	
}
