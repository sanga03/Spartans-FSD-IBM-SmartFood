package com.example.shared;

import java.util.List;

import com.example.entity.CustomerPhysical;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CustomerAccountDto {

	private String name;
	private String email;
	private String phone;
	private String password;
	private String passwordBcrypt;
	private List<CustomerPhysical> list;
	
	public CustomerAccountDto(List<CustomerPhysical> list,String passwordBcrypt,String password,String name, String email, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.passwordBcrypt = passwordBcrypt;
		this.list = list;
	}

	public List<CustomerPhysical> getList() {
		return list;
	}

	public void setList(List<CustomerPhysical> list) {
		this.list = list;
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
