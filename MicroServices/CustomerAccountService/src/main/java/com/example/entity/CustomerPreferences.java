package com.example.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CustomerPreferences {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String category;
	private String target_weight;
	private String time_period;
	public CustomerPreferences(String category, String target_weight, String time_period) {
		super();
		this.category = category;
		this.target_weight = target_weight;
		this.time_period = time_period;
	}
	public CustomerPreferences() {
		super();
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getTarget_weight() {
		return target_weight;
	}
	public void setTarget_weight(String target_weight) {
		this.target_weight = target_weight;
	}
	public String getTime_period() {
		return time_period;
	}
	public void setTime_period(String time_period) {
		this.time_period = time_period;
	}
}
