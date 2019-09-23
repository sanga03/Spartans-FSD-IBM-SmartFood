package com.example.entity;

import com.example.entity.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class CustomerAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String uid;
	private String name;
	private String email;
	private String password;
	private String phone;
	
	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name="phy_id")
	private CustomerPhysical c_phy;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="pref_id")
	private CustomerPreferences c_pref;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="ord_id")
	private CustomerOrders c_ord;
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="tra_id")
	private CustomerTrack c_tra;
	
	
	public CustomerAccount(String name, String email, String password, String phone) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.phone = phone;
	}

	public CustomerAccount() {
		super();
	}
	@JsonIgnore
	public CustomerPhysical getC_phy() {
		return c_phy;
	}

	public void setC_phy(CustomerPhysical c_phy) {
		this.c_phy = c_phy;
	}
	@JsonIgnore
	public CustomerPreferences getC_pref() {
		return c_pref;
	}

	public void setC_pref(CustomerPreferences c_pref) {
		this.c_pref = c_pref;
	}
	@JsonIgnore
	public CustomerOrders getC_ord() {
		return c_ord;
	}

	public void setC_ord(CustomerOrders c_ord) {
		this.c_ord = c_ord;
	}
	@JsonIgnore
	public CustomerTrack getC_tra() {
		return c_tra;
	}

	public void setC_tra(CustomerTrack c_tra) {
		this.c_tra = c_tra;
	}

	@JsonIgnore
	public CustomerPhysical getc_phy() {
		return c_phy;
	}

	public void setc_phy(CustomerPhysical c_phy) {
		this.c_phy = c_phy;
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
