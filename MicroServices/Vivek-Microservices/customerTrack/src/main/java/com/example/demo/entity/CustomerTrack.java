package com.example.demo.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
	 @JoinColumn(name = "customer_account_id")
	private CustomerAccount customerAccount;
}
