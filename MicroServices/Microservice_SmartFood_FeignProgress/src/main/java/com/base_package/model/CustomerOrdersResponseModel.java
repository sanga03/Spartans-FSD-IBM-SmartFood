package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrdersResponseModel {
	private String restId;
	private String date;
	private String uorderId;
	private String cust;
	private String [] foodorderid;
}
