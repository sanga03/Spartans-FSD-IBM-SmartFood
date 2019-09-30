package com.base_package.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.base_package.comparator.DefaultFoodComparator;
import com.base_package.model.BasicIngredientResponseModel;
import com.base_package.model.CustomFoodDetailsResponseModel;
import com.base_package.model.CustomIngredientResponseModel;
import com.base_package.model.CustomerOrdersResponseModel;
import com.base_package.model.CustomerPhysicalResponseModel;
import com.base_package.model.CustomerPreferencesResponseModel;
import com.base_package.model.CustomerTrackResponseModel;
import com.base_package.model.DefaultFoodResponseModel;
import com.base_package.model.FoodResponseModel;
import com.base_package.model.PersonalFoodResponseModel;
import com.base_package.model.RestaurantResponseModel;


public class ListFoodsService {


	public List<DefaultFoodResponseModel> getDefaultFoods(List<FoodResponseModel> foodList,
			List<CustomFoodDetailsResponseModel> customFoodList,
			List<CustomIngredientResponseModel> customIngredientList,
			List<BasicIngredientResponseModel> basicIngredientList) {
		
		
		List<DefaultFoodResponseModel> list = new ArrayList<DefaultFoodResponseModel>();
		DefaultFoodResponseModel defaultFoodResponseModel;

		System.out.println("foodList - "+foodList.toString());
		System.out.println("customFoodList - "+customFoodList.toString());
		
		for (FoodResponseModel foodResponseModel : foodList) {
			for (CustomFoodDetailsResponseModel customFoodDetailsResponseModel : customFoodList) {
				if (customFoodDetailsResponseModel.getFoodUuid().equals(foodResponseModel.getFuid())) {
					
					System.out.println("Entered");
					
					Double calories = 0.0;
					for(CustomIngredientResponseModel customIngredientResponseModel: customIngredientList) {
						if(customIngredientResponseModel.getCustomFoodDetailId().equals(customFoodDetailsResponseModel.getUuid())) {
							for(BasicIngredientResponseModel basicIngredientResponseModel : basicIngredientList) {
								if(customIngredientResponseModel.getBasicIngredientId().equals(basicIngredientResponseModel.getBUuid())) {
									calories = calories + calculateFoodCalories(basicIngredientResponseModel.getCalPerGram(), customIngredientResponseModel.getAmount());
									System.out.println("Calculated calories "+calories);
								}
							}
						}
					}
					
					defaultFoodResponseModel = new DefaultFoodResponseModel();

					defaultFoodResponseModel.setCalories(calories);
					defaultFoodResponseModel.setCategory(foodResponseModel.getCategory());
					defaultFoodResponseModel.setCuisine(foodResponseModel.getCuisine());
					defaultFoodResponseModel.setCustomFoodImageLink(customFoodDetailsResponseModel.getImageLink());
					defaultFoodResponseModel.setFoodName(foodResponseModel.getName());
					defaultFoodResponseModel.setPrice(customFoodDetailsResponseModel.getPrice());
					defaultFoodResponseModel.setQuantity(customFoodDetailsResponseModel.getQuantity());
					defaultFoodResponseModel.setRating(customFoodDetailsResponseModel.getRating());

					list.add(defaultFoodResponseModel);
				}
			}
		}
		
		Collections.sort(list,new DefaultFoodComparator());
		System.out.println("List - "+list.toString());
		return list;
	}
	
	public Double calculateFoodCalories(Float caloriesPerGram, Double amount) {
		return caloriesPerGram * amount / 100;
	}

	public List<PersonalFoodResponseModel> getPersonalFoods(List<FoodResponseModel> foodList,
			List<CustomFoodDetailsResponseModel> customFoodList,
			List<CustomIngredientResponseModel> customIngredientList,
			List<BasicIngredientResponseModel> basicIngredientList,
			List<RestaurantResponseModel> restaurantList,
			CustomerPhysicalResponseModel customerPhysicalResponseModel,
			CustomerPreferencesResponseModel customerPreferencesResponseModel,
			CustomerOrdersResponseModel customerOrdersResponseModel,
			CustomerTrackResponseModel customerTrackResponseModel,
			String coordinates) {
		
		Long startDate = customerPreferencesResponseModel.getStartDate();
		Long currentDate = new Date().getTime();
		Long targetDate = customerPreferencesResponseModel.getTargetDate();
		
		Float targetWeight = customerPreferencesResponseModel.getTargetWeight();
		Float currentWeight = customerPhysicalResponseModel.getWeight();
		Float currentBMR = customerPhysicalResponseModel.getBmr();
		
		Float personalCaloriesPerDay = calculatePersonalCalories(startDate,targetDate,currentWeight,targetWeight,currentBMR);
		Integer timeOfDay = 3;
		boolean weightLoss = false;
		Float caloriesToConsumeNow = personalCaloriesPerDay/timeOfDay;
		if(caloriesToConsumeNow < 0) {
			weightLoss = true;
			caloriesToConsumeNow *= -1;
		}

		// take care of orders and track using currenttime, change the caloriesToConsumeNow , consider gender
		
		PersonalFoodResponseModel personalFoodResponseModel;
		List<PersonalFoodResponseModel> list = new ArrayList<PersonalFoodResponseModel>();
		for(FoodResponseModel foodResponseModel: foodList) {
			for(CustomFoodDetailsResponseModel customFoodDetailsResponseModel: customFoodList) {
				if(customFoodDetailsResponseModel.getFoodUuid().equals(foodResponseModel.getFuid())) {
					Double calories = 0.0;
					for(CustomIngredientResponseModel customIngredientResponseModel: customIngredientList) {
						if(customIngredientResponseModel.getCustomFoodDetailId().equals(customFoodDetailsResponseModel.getUuid())) {
							for(BasicIngredientResponseModel basicIngredientResponseModel : basicIngredientList) {
								if(customIngredientResponseModel.getBasicIngredientId().equals(basicIngredientResponseModel.getBUuid())) {
									calories = calories + calculateFoodCalories(basicIngredientResponseModel.getCalPerGram(), customIngredientResponseModel.getAmount());
								}
							}
						}
					}
					
					
					personalFoodResponseModel = new PersonalFoodResponseModel();
					
					personalFoodResponseModel.setCalories(calories);
					personalFoodResponseModel.setCategory(foodResponseModel.getCategory());
					personalFoodResponseModel.setCuisine(foodResponseModel.getCuisine());
					personalFoodResponseModel.setCustomFoodImageLink(customFoodDetailsResponseModel.getImageLink());
					personalFoodResponseModel.setDistance(calculateDistance(restaurantList,customFoodDetailsResponseModel.getRestaurantUuid(),coordinates));
					personalFoodResponseModel.setFoodName(foodResponseModel.getName());
					personalFoodResponseModel.setPrice(customFoodDetailsResponseModel.getPrice());
					personalFoodResponseModel.setQuantity(customFoodDetailsResponseModel.getQuantity()); //calculate?
					personalFoodResponseModel.setRating(customFoodDetailsResponseModel.getRating());
					
					if(weightLoss) {
						if(calories < (caloriesToConsumeNow - 100)) {
							personalFoodResponseModel.setPriority(1);
						}
						else if (caloriesToConsumeNow <= caloriesToConsumeNow) {
							personalFoodResponseModel.setPriority(0);
						}
						else {
							personalFoodResponseModel.setPriority(-1);
						}
					}
					
					else {
						if(calories > (caloriesToConsumeNow + 100)) {
							personalFoodResponseModel.setPriority(1);
						}
						else if (caloriesToConsumeNow >= caloriesToConsumeNow) {
							personalFoodResponseModel.setPriority(0);
						}
						else {
							personalFoodResponseModel.setPriority(-1);
						}
					}
					list.add(personalFoodResponseModel);
				}
			}
		}
		
		
		//calculate location
		//sort by calories,then cuisine, then location, then rating
		return list;
	}

	private Float calculateDistance(List<RestaurantResponseModel> restaurantList, String restaurantUuid,
			String coordinates) {
		// TODO Auto-generated method stub
		return null;
	}

	private Float calculatePersonalCalories(Long startDate, Long targetDate, Float currentWeight, Float targetWeight,
			Float currentBMR) {
		
		Float numberOfDays =  (float) ((targetDate - startDate)/86400000);
		System.out.println("Number of days: "+numberOfDays);
		Float weightChange = targetWeight - currentWeight ;
		Float totalCaloriesToConsume = weightChange * 7700;
		Float caloriesToConsumePerDay = currentBMR - (totalCaloriesToConsume/numberOfDays);
		return caloriesToConsumePerDay;
		
	}

}
