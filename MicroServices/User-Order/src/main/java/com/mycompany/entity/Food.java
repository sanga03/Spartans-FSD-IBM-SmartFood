package com.mycompany.entity;


import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;



@Entity 
public class Food {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long f_id;
	private Long r_id;
	private String f_name;
	UUID f_uuid = UUID.randomUUID();
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private UserOrder order;
	
	public Long getF_id() {
		return f_id;
	}
	public void setF_id(Long f_id) {
		this.f_id = f_id;
	}
	public Long getR_id() {
		return r_id;
	}
	public void setR_id(Long r_id) {
		this.r_id = r_id;
	}
	public String getF_name() {
		return f_name;
	}
	public void setF_name(String f_name) {
		this.f_name = f_name;
	}
	public UUID getF_uuid() {
		return f_uuid;
	}
	public void setF_uuid(UUID f_uuid) {
		this.f_uuid = f_uuid;
	}
	
	public void setOrder(UserOrder order) {
		this.order = order;
	}
	public Food() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Food(Long r_id, String f_name) {
		super();
		this.r_id = r_id;
		this.f_name = f_name;
	}
	
	public Food(Long r_id, String f_name, UserOrder order) {
		super();
		this.r_id = r_id;
		this.f_name = f_name;
		this.order = order;
	}
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return f_id != null ? f_id.hashCode() : 0;
	}
	@Override
	public boolean equals(Object o) {
		// TODO Auto-generated method stub
		if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Food food = (Food) o;

        return f_id != null ? f_id.equals(food.f_id) : food.f_id == null;
	}
	@Override
	public String toString() {
		return "Food [f_id=" + f_id + ", r_id=" + r_id + ", f_name=" + f_name + ", f_uuid=" + f_uuid + "]";
	}
	
}
