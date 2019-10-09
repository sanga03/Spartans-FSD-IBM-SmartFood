package com.example.demo.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="restaurant_service")
public class Restaurant {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	private Long id;

	private String name;
	private Long contact;
	private double rating;
	private String resId;
	private String location;
	private String co_ordinates;
	

}
