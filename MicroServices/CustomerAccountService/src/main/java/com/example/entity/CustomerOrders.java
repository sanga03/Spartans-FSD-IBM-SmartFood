package com.example.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="customer_orders")
public class CustomerOrders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String date;
	private String restaurant_id;
	@OneToOne(cascade = CascadeType.ALL)
	private CustomerAccount ca;
	public CustomerOrders() {
		super();
	}
	public CustomerOrders(String date, String restaurant_id) {
		super();
		this.date = date;
		this.restaurant_id = restaurant_id;
	}
	@JsonIgnore
	public CustomerAccount getCa() {
		return ca;
	}
	public void setCa(CustomerAccount ca) {
		this.ca = ca;
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
	public String getRestaurant_id() {
		return restaurant_id;
	}
	public void setRestaurant_id(String restaurant_id) {
		this.restaurant_id = restaurant_id;
	};
	
}
