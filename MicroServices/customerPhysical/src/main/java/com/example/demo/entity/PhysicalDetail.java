package com.example.demo.entity;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhysicalDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
     private int id;
     private String uPuuid;
     private float height;
     private float weight;
     private Date dob;
     private Gender gender;
     private float bmi;
     private float bmr;
     private int caloriesBurn;
     @OneToOne
     private Customer customer;
	
      
   
}
     
     
