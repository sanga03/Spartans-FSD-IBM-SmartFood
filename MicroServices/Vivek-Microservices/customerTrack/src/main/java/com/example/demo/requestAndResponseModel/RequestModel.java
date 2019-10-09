package com.example.demo.requestAndResponseModel;

import java.util.Date;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestModel {
	private long tackingDate;
	private int mealTime;
	private int calories;
}
