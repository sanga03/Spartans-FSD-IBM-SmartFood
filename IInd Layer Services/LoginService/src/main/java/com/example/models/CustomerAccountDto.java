package com.example.models;


public class CustomerAccountDto {

	private String uuid;
	private String name;
	private String email;
	private String phone;
	private String password;
	private String passwordBcrypt;
	private CustomerPhysical cp;

	public CustomerAccountDto(String uuid,CustomerPhysical cp, String passwordBcrypt, String password, String name, String email,
			String phone) {
		super();
		this.uuid = uuid;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.passwordBcrypt = passwordBcrypt;
		this.cp = cp;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public CustomerPhysical getCp() {
		return cp;
	}

	public void setCp(CustomerPhysical cp) {
		this.cp = cp;
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

	public String getPasswordBcrypt() {
		return passwordBcrypt;
	}

	public void setPasswordBcrypt(String passwordBcrypt) {
		this.passwordBcrypt = passwordBcrypt;
	}

}
