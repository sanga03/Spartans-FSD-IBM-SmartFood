package com.mycompany.model;

import java.util.List;

import javax.persistence.Column;

import com.mycompany.entity.Food;
import com.mycompany.entity.UserOrder;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Data
public class ResponseModel {

	private int restId;
	private String date;
	private String uorderId ;
	private String cust;
	public ResponseModel(int restId, String date, String uorderId, String cust) {
		super();
		this.restId = restId;
		this.date = date;
		this.uorderId = uorderId;
		this.cust = cust;
	}
	public ResponseModel() {
		super();
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
	public String getcust() {
		return cust;
	}
	public void setcust(String cust) {
		this.cust = cust;
	}
	
}
