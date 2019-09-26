package com.mycompany.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RequestModel {

	private String cust;
	private String restId;
	private String date;
	private String uorderId;
	
	
	public RequestModel() {
		super();
		// TODO Auto-generated constructor stub
	}


	public RequestModel(String cust, String restId,String date, String uorderId) {
		super();
		this.cust = cust;
		this.restId = restId;
		this.date = date;
		this.uorderId = uorderId;
	}


	public String getCust() {
		return cust;
	}


	public void setCust(String cust) {
		this.cust = cust;
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


	@Override
	public String toString() {
		return "RequestModel [cust=" + cust + ", restId=" + restId + ", date=" + date + ", uorderId=" + uorderId + "]";
	}

	
}
