package com.mycompany.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "Customer_order_food")
public class Food {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "userorderid")
	private UserOrder UserOrder;
	
	@Column(name = "uorder_id")
	private String uorderId;

	@Column(name = "custfoodid")
	private String custFoodId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserOrder getUserOrder() {
		return UserOrder;
	}

	public void setUserOrder(UserOrder userOrder) {
		UserOrder = userOrder;
	}

	

	public String getUorderId() {
		return uorderId;
	}

	public void setUorderId(String uorderId) {
		this.uorderId = uorderId;
	}

	public String getCustFoodId() {
		return custFoodId;
	}

	public void setCustFoodId(String custFoodId) {
		this.custFoodId = custFoodId;
	}

	@Override
	public String toString() {
		return "Food [UserOrder=" + UserOrder +  ", uorderId=" + uorderId + ", custFoodId="
				+ custFoodId + "]";
	}
	
}
