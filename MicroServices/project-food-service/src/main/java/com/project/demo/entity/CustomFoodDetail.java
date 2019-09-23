package com.project.demo.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class CustomFoodDetail {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

}
