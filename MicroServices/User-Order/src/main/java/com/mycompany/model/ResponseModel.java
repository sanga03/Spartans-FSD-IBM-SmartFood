package com.mycompany.model;


import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Data
public class ResponseModel {

	public List<String> getFoodorderid() {
		return foodorderid;
	}
	public void setFoodorderid(List<String> foodorderid) {
		this.foodorderid = foodorderid;
	}
	private String restId;
	private String date;
	private String uorderId ;
	private String cust;
	private List<String> foodorderid;
	public ResponseModel(String restId, String date, String uorderId, String cust) {
		super();
		this.restId = restId;
		this.date = date;
		this.uorderId = uorderId;
		this.cust = cust;
	}
	public ResponseModel() {
		super();
		foodorderid=new ArrayList<String>();
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
	public String getCust() {
		return cust;
	}
	public void setCust(String cust) {
		this.cust = cust;
	}
	@Override
	public String toString() {
		return "ResponseModel [restId=" + restId + ", date=" + date + ", uorderId=" + uorderId + ", cust=" + cust + "]";
	}
	
}
