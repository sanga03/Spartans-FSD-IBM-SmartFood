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
	
	private Long startDate;
	private Long targetDate;
	private Long currentDate;
	private Float currentBMR;
	private Float currentBMI;
	private Float targetWeight;
	private Float startWeight;
	private Float approximateCurrentWeight;
	private Integer numberOfOrders;
	private Integer numberOfTracks;
	private Float caloriesConsumed;
	private Integer onTrack;
	
}
