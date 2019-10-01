package com.example.demo.dto;

import java.util.UUID;

import javax.persistence.OneToOne;


import com.example.demo.entity.CustomerAccount;
import com.example.demo.entity.Restaurant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRecordDto {
   
	private String pUuid;
    private Restaurant restaurant;
    private CustomerAccount customerAccount;
    private float amount;
    public PaymentRecordDto( float amount) {
		super();
		this.amount = amount;
		this.pUuid = "P"+UUID.randomUUID().toString();
	} 
}
