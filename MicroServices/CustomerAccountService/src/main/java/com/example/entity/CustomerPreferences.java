package com.example.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Table(name = "customer_preferences")
public class CustomerPreferences {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//Auto Generated id
	@Column(name = "id")
	int id;
	//uUuid same as user account table
	@Column(name="u_uuid")
	String uUuid;
	//An auto Generated uuid for userPreference
	@Column(name="upr_uuid")
	String uprUuid;
	//His favorite category (Veg/non-veg)
	@Column(name = "category")
	int category;
	//if he wants to reduce weight
	@Column(name="target_weight")
	Float targetWeight;
//	@JsonIgnore
//	@OneToMany(cascade = CascadeType.ALL,mappedBy = "userPreferences")
//	Set<Cuisines> cuisines;
	@OneToOne(cascade = CascadeType.ALL)
	private CustomerAccount ca;
}