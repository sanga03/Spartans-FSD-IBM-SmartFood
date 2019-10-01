package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerPreferencesResponseModel {
	private String uprUuid;
	private Integer category;
	private Float targetWeight;
	private Long startDate;
	private Long targetDate;
	private String [] cusines;
	private String uuuid;
}
