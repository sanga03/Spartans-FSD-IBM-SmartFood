package com.example.demo.paymentmodel;


public class RequestModel 
{   
	
	private String resId;
	private String uuid;
	
	private float amount;
	
	public RequestModel(String resId, String uuid, float amount) {
		super();
		this.resId = resId;
		this.uuid = uuid;
		this.amount = amount;
	}

	public RequestModel() {
		// TODO Auto-generated constructor stub
	}

	public String getResId() {
		return resId;
	}

	public void setResId(String resId) {
		this.resId = resId;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

}