package com.example.shared;



public class CustomerAccountDto {

	private String uid;
	private String name;
	private String email;
	private String phone;
	private String password;

	public CustomerAccountDto(String uid, String password, String name, String email,
			String phone) {
		super();
		this.uid = uid;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
	}

	public String getuid() {
		return uid;
	}

	public void setuid(String uid) {
		this.uid = uid;
	}



	public CustomerAccountDto() {
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


}
