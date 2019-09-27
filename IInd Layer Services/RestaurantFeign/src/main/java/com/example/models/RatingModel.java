package com.example.models;

public class RatingModel {

	private double min;
	private double max;
	
	
	public RatingModel() {
		super();
	}


	public RatingModel(double min, double max) {
		super();
		this.min = min;
		this.max = max;
	}


	public double getMin() {
		return min;
	}


	public void setMin(double min) {
		this.min = min;
	}


	public double getMax() {
		return max;
	}


	public void setMax(double max) {
		this.max = max;
	}
	
	
}
