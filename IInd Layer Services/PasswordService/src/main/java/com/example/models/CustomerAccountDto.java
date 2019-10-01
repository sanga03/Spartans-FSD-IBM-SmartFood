package com.example.models;


public class CustomerAccountDto {

	private String uuid;
	private String name;
	private String email;
	private String phone;
	private String password;
	private String passwordBcrypt;

	public CustomerAccountDto(String uuid, String passwordBcrypt, String password, String name, String email,
			String phone) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.passwordBcrypt = passwordBcrypt;
		this.uuid = uuid;
	}

	
	public CustomerAccountDto() {
		super();
	}
	

	public String getUuid() {
		return uuid;
	}


	public void setUuid(String uuid) {
		this.uuid = uuid;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordBcrypt() {
		return passwordBcrypt;
	}

	public void setPasswordBcrypt(String passwordBcrypt) {
		this.passwordBcrypt = passwordBcrypt;
	}
}