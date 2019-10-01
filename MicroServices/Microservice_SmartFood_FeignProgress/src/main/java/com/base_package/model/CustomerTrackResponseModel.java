package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerTrackResponseModel {
	private String utUuid;
	private String tackingDate;
	private String mealTime;
	private int calories;
}
