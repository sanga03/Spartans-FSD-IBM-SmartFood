package com.mycompany.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


@Entity
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long c_id;
	private String name;

	@OneToMany(mappedBy = "customer" , cascade = CascadeType.ALL)
	private List<UserOrder> order;

	public Long getC_id() {
		return c_id;
	}

	public void setC_id(Long c_id) {
		this.c_id = c_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	public List<UserOrder> getOrder() {
		return order;
	}

	public void setOrder(List<UserOrder> order) {
		this.order = order;
	}

	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Customer(String name) {
		super();
		this.name = name;
	}

	public Customer(String name, List<UserOrder> order) {
		super();
		this.name = name;
		this.order = order;
	}

	
	
}
