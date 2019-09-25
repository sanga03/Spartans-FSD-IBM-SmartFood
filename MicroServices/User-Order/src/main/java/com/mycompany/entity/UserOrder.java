package com.mycompany.entity;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
@Table(name = "customer_orders")
public class UserOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private int id;
	@Column(name = "rest_id")
	private int restId;
	@Column(name = "date")
	private String date;
	@Column(name = "uorder_id")
	private String uorderId ;
	@Column(name = "cust_id")
	private String cust;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Food> foodId;
	
		
	public UserOrder(int restId, String date) {
		super();
		this.restId = restId;
		this.date = date;
	}
	public UserOrder(int restId, String date, List<Food> foodId, String cust) {
		super();
		this.restId = restId;
		this.date = date;
		this.foodId = foodId;
		this.cust = cust;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRestId() {
		return restId;
	}
	public void setRestId(int restId) {
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
	@JsonIgnore
	public List<Food> getFoodId() {
		return foodId;
	}
	public void setFood(List<Food> foodId) {
		this.foodId = foodId;
	}
	
	
	public String getcust() {
		return cust;
	}
	public void setcust(String cust) {
		this.cust = cust;
	}
	public UserOrder() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "UserOrder [id=" + id + ", restId=" + restId + ", date=" + date + ", uorderId=" + uorderId + ", foodId=" + foodId
				+ ", cust=" + cust+ "]";
	}
	
	
	
	

}
