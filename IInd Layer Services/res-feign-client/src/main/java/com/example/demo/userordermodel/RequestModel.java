package com.example.demo.userordermodel;


import java.util.ArrayList;
import java.util.List;


public class RequestModel {

	private String restId;
	private String date;
	private String uorderId ;
	private String customerId;
	private List<String> foodorderid;
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

	
	public RequestModel(String restId, String date, String uorderId, String customerId, List<String> foodorderid) {
		super();
		this.restId = restId;
		this.date = date;
		this.uorderId = uorderId;
		this.customerId = customerId;
		this.foodorderid = foodorderid;
	}
	public List<String> getFoodorderid() {
		return foodorderid;
	}
	public void setFoodorderid(List<String> foodorderid) {
		this.foodorderid = foodorderid;
	}
	public RequestModel() {
		super();
		foodorderid=new ArrayList<String>();
		
	}

}