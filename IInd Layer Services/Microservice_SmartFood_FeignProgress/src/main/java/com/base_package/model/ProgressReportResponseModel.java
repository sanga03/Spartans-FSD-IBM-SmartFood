package com.base_package.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProgressReportResponseModel {
	
	//common stuff across the list
	private Long startDate;
	private Long targetDate;
	private Float targetWeight;
	private Float startWeight;
	private Float currentBMR;
	private Float currentBMI;
	
	//specific to date
	private Float caloriesSupposedToBeConsumed;
	private Integer day;
	private Float approximateCurrentWeight;
	private Integer numberOfOrders;
	private Integer numberOfTracks;
	private Double caloriesConsumed;
	
	private Integer onTrack;

	public void addCaloriesConsumed(Double calories) {
		this.setCaloriesConsumed(this.getCaloriesConsumed()+calories);
	}
	
}
