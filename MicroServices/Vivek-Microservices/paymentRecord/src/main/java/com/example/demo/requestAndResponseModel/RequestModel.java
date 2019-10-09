package com.example.demo.requestAndResponseModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestModel {   
	
	private String resId;
	private String uuid;
	private float amount;

}
