package com.example.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="restaurant_category")
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String resId;
	private int category;
	public Category( String resId, int category) {
		super();
		this.resId = resId;
		this.category = category;
	}
	public Category() {
		super();
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getResId() {
		return resId;
	}
	public void setResId(String resId) {
		this.resId = resId;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	
}
