package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantResponseModel {
	
	private String name;
	private Long contact;
	private Float rating;
	private String resId;
	private String location;
	private String co_ordinates;
}
