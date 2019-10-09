package com.example.demo.entity;

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
public class PaymentRecord {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String pUuid;
    @OneToOne
    private Restaurant restaurant;
    @OneToOne
    private CustomerAccount customerAccount;
    private float amount;
	 
    
    
}
