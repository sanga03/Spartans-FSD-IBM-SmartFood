package com.example.models;


import java.util.List;

public class CustomerAccount {
	
	private Integer id;
	private String uid;
	private String name;
	private String email;
	private String password;
	private String phone;
	
	private List<CustomerOrders> orders;
	
	
	public CustomerAccount(String name, String email, String password, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.orders = orders;
	}

	public CustomerAccount() {
		super();
	}
	public List<CustomerOrders> getOrders() {
		return orders;
	}

	public void setOrders(List<CustomerOrders> orders) {
		this.orders = orders;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	
	
	
	
	
	

}
