package com.example.demo;

public class Order {

	private double price;
	private String currency;
	private String method;
	private String intent;
	private String description;
	
	@Override
	public String toString() {
		return "Order [price=" + price + ", currency=" + currency + ", method=" + method + ", intent=" + intent
				+ ", description=" + description + "]";
	}
	public Order() {
		super();
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public String getIntent() {
		return intent;
	}
	public void setIntent(String intent) {
		this.intent = intent;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}