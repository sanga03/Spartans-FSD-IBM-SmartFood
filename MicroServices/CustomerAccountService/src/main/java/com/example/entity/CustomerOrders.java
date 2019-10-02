package com.example.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="customer_orders")
public class CustomerOrders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(name="date")
	private String date;
	@Column(name="rest_id")
	private String restId;
	@Column(name="uorder_id")
	private String uorderId;
	@Column(name="cust_id")
	private String cust;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Food> foodId;
	
	public CustomerOrders() {
		super();
	}

	public CustomerOrders(String date, String restId, String cust, List<Food> foodId) {
		super();
		this.date = date;
		this.restId = restId;
		this.cust = cust;
		this.foodId = foodId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getRestId() {
		return restId;
	}

	public void setRestId(String restId) {
		this.restId = restId;
	}

	public String getUorderId() {
		return uorderId;
	}

	public void setUorderId(String uorderId) {
		this.uorderId = uorderId;
	}

	public String getCust() {
		return cust;
	}

	public void setCust(String cust) {
		this.cust = cust;
	}

	public List<Food> getFoodId() {
		return foodId;
	}

	public void setFoodId(List<Food> foodId) {
		this.foodId = foodId;
	}
	
	
	
}
