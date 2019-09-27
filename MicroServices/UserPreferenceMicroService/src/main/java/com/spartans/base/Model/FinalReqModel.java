package com.spartans.base.Model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class FinalReqModel {
	String uUuid;
	String uprUuid;
	int category;
	Float targetWeight;
	List<String> cusines;
	public FinalReqModel() {
		super();
		cusines=new ArrayList<String>();
	}
	@Override
	public String toString() {
		return "FinalReqModel [uUuid=" + uUuid + ", uprUuid=" + uprUuid + ", category=" + category + ", targetWeight="
				+ targetWeight + ", cusines=" + cusines + "]";
	}
	
	
	
	
	}
	

