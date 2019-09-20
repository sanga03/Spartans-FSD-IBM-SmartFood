package com.example.demo.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomerTrack { 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private int id;
	private String utUuid;
	private Date tackingDate;
	private MealTime mealTime;
	private int calories;
	@OneToOne
	private Customer customer;
}
