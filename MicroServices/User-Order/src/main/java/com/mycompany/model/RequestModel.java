package com.mycompany.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RequestModel {

	private String cust;
	private int restId;
	private long date;
	private String uorderId;
	
	
	public RequestModel() {
		super();
		// TODO Auto-generated constructor stub
	}


	public RequestModel(String cust, int restId, long date, String uorderId) {
		super();
		this.cust = cust;
		this.restId = restId;
		this.date = date;
		this.uorderId = uorderId;
	}


	public String getcust() {
		return cust;
	}


	public void setcust(String cust) {
		this.cust = cust;
	}


	public int getRestId() {
		return restId;
	}


	public void setRestId(int restId) {
		this.restId = restId;
	}


	public long getDate() {
		return date;
	}


	public void setDate(long date) {
		this.date = date;
	}


	public String getUorderId() {
		return uorderId;
	}


	public void setUorderId(String uorderId) {
		this.uorderId = uorderId;
	}
	
}
