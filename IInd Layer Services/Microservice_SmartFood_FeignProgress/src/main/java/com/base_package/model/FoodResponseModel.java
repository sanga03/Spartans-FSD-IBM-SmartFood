package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoodResponseModel {
	private String image;
	private String name;
	private boolean category;
	private String cuisine;
	private String fuid;
	private String ruid;
	
	public boolean getCategory() {
		return category;
	}

}
