package com.example.demo.requestAndResponseModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseModel {  
	
	private String p_uuid;
	private String restaurantName;
	private String userName;
	private float amount;

}
