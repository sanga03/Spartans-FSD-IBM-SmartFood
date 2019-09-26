package com.mycompany.model;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Data
public class ResponseModel {

	private String restId;
	private String date;
	private String uorderId ;
	private String cust;
	public ResponseModel(String restId, String date, String uorderId, String cust) {
		super();
		this.restId = restId;
		this.date = date;
		this.uorderId = uorderId;
		this.cust = cust;
	}
	public ResponseModel() {
		super();
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
