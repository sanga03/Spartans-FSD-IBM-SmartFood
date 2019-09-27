package com.example.demo.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity

@Table(name = "customer_orders")
public class UserOrder {
	
	@Override
	public String toString() {
		return "UserOrder [id=" + id + ", restId=" + restId + ", date=" + date + ", uorderId=" + uorderId
				+ ", customerId=" + customerId + ", foodId=" + foodId + "]";
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	@Column(name = "rest_id")
	private String restId;
	@Column(name = "date")
	private String date;
	@Column(name = "uorder_id")
	private String uorderId ;
	@Column(name = "cust_id")
	private String customerId;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Food> foodId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRestId() {
		return restId;
	}

	public void setRestId(String restId) {
		this.restId = restId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getUorderId() {
		return uorderId;
	}

	public void setUorderId(String uorderId) {
		this.uorderId = uorderId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public List<Food> getFoodId() {
		return foodId;
	}

	public void setFoodId(List<Food> foodId) {
		this.foodId = foodId;
	}
	
	
	

}