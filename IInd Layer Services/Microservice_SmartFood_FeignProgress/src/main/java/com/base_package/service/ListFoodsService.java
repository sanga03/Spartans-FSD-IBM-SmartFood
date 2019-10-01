package com.base_package.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import com.base_package.comparator.DefaultFoodComparator;
import com.base_package.comparator.PersonalFoodComparator;
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

		System.out.println("foodList - " + foodList.toString());
		System.out.println("customFoodList - " + customFoodList.toString());

		for (FoodResponseModel foodResponseModel : foodList) {
			for (CustomFoodDetailsResponseModel customFoodDetailsResponseModel : customFoodList) {
				if (customFoodDetailsResponseModel.getFoodUuid().equals(foodResponseModel.getFuid())) {

					System.out.println("Entered");

					Double calories = 0.0;
					for (CustomIngredientResponseModel customIngredientResponseModel : customIngredientList) {
						if (customIngredientResponseModel.getCustomFoodDetailId()
								.equals(customFoodDetailsResponseModel.getUuid())) {
							for (BasicIngredientResponseModel basicIngredientResponseModel : basicIngredientList) {
								if (customIngredientResponseModel.getBasicIngredientId()
										.equals(basicIngredientResponseModel.getBUuid())) {
									calories = calories
											+ calculateFoodCalories(basicIngredientResponseModel.getCalPerGram(),
													customIngredientResponseModel.getAmount());
									System.out.println("Calculated calories " + calories);
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

		Collections.sort(list, new DefaultFoodComparator());
		System.out.println("List - " + list.toString());
		return list;
	}

	public Double calculateFoodCalories(Float caloriesPerGram, Double amount) {
		return caloriesPerGram * amount / 100;
	}

	public List<PersonalFoodResponseModel> getPersonalFoods(List<FoodResponseModel> foodList,
			List<CustomFoodDetailsResponseModel> customFoodList,
			List<CustomIngredientResponseModel> customIngredientList,
			List<BasicIngredientResponseModel> basicIngredientList, List<RestaurantResponseModel> restaurantList,
			CustomerPhysicalResponseModel customerPhysicalResponseModel,
			CustomerPreferencesResponseModel customerPreferencesResponseModel,
			List<CustomerOrdersResponseModel> customerOrdersResponseModelList,
			List<CustomerTrackResponseModel> customerTrackResponseModelList, String coordinates) {

		Long startDate = customerPreferencesResponseModel.getStartDate();
		Long currentDate = new Date().getTime();
		Long targetDate = customerPreferencesResponseModel.getTargetDate();
		System.out.println("targetDate-startDate " + ((targetDate - startDate) / 86400000));

		Float targetWeight = customerPreferencesResponseModel.getTargetWeight();
		Float currentWeight = customerPhysicalResponseModel.getWeight();
		Float currentBMR = customerPhysicalResponseModel.getBmr();

		Float personalCaloriesPerDay = calculatePersonalCalories(startDate, targetDate, currentWeight, targetWeight,
				currentBMR);
		Integer timeOfDay = 3;
		Float caloriesToConsumeNow = personalCaloriesPerDay / timeOfDay;

		caloriesToConsumeNow = updateCaloriesBasedOnPreviousRecords(caloriesToConsumeNow,
				customerOrdersResponseModelList, customerTrackResponseModelList, customFoodList, customIngredientList,
				basicIngredientList);

		PersonalFoodResponseModel personalFoodResponseModel;
		List<PersonalFoodResponseModel> list = new ArrayList<PersonalFoodResponseModel>();
		for (FoodResponseModel foodResponseModel : foodList) {
			for (CustomFoodDetailsResponseModel customFoodDetailsResponseModel : customFoodList) {
				if (customFoodDetailsResponseModel.getFoodUuid().equals(foodResponseModel.getFuid())) {
					Double calories = 0.0;
					for (CustomIngredientResponseModel customIngredientResponseModel : customIngredientList) {
						if (customIngredientResponseModel.getCustomFoodDetailId()
								.equals(customFoodDetailsResponseModel.getUuid())) {
							for (BasicIngredientResponseModel basicIngredientResponseModel : basicIngredientList) {
								if (customIngredientResponseModel.getBasicIngredientId()
										.equals(basicIngredientResponseModel.getBUuid())) {
									calories = calories
											+ calculateFoodCalories(basicIngredientResponseModel.getCalPerGram(),
													customIngredientResponseModel.getAmount());
								}
							}
						}
					}

					personalFoodResponseModel = new PersonalFoodResponseModel();

					personalFoodResponseModel.setCalories(calories);
					personalFoodResponseModel.setCategory(foodResponseModel.getCategory());
					personalFoodResponseModel.setCuisine(foodResponseModel.getCuisine());
					personalFoodResponseModel.setCustomFoodImageLink(customFoodDetailsResponseModel.getImageLink());
					personalFoodResponseModel.setDistance(calculateDistance(restaurantList,
							customFoodDetailsResponseModel.getRestaurantUuid(), coordinates));
					personalFoodResponseModel.setFoodName(foodResponseModel.getName());
					personalFoodResponseModel.setPrice(customFoodDetailsResponseModel.getPrice());
					personalFoodResponseModel.setQuantity(customFoodDetailsResponseModel.getQuantity()); // calculate?
					personalFoodResponseModel.setRating(customFoodDetailsResponseModel.getRating());
					personalFoodResponseModel.setCustomFoodId(customFoodDetailsResponseModel.getUuid());
					
					for(RestaurantResponseModel restaurantResponseModel : restaurantList) {
						if(customFoodDetailsResponseModel.getRestaurantUuid().equals(restaurantResponseModel.getResId())) {
							personalFoodResponseModel.setRestaurantId(customFoodDetailsResponseModel.getRestaurantUuid());
							personalFoodResponseModel.setRestaurantName(restaurantResponseModel.getName());
						}
					}

					if ((currentBMR - personalCaloriesPerDay) > 0) {
						if (calories < (caloriesToConsumeNow - 100)) {
							personalFoodResponseModel.setPriority(1);
						} else if (calories <= caloriesToConsumeNow) {
							personalFoodResponseModel.setPriority(0);
						} else {
							personalFoodResponseModel.setPriority(-1);
						}
					}

					else {
						if (calories > (caloriesToConsumeNow + 100)) {
							personalFoodResponseModel.setPriority(1);
						} else if (calories >= caloriesToConsumeNow) {
							personalFoodResponseModel.setPriority(0);
						} else {
							personalFoodResponseModel.setPriority(-1);
						}
					}
					list.add(personalFoodResponseModel);
				}
			}
		}

		Collections.sort(list, new PersonalFoodComparator());
		return list;
	}

	private Float updateCaloriesBasedOnPreviousRecords(Float caloriesToConsumeNow,
			List<CustomerOrdersResponseModel> customerOrdersResponseModelList,
			List<CustomerTrackResponseModel> customerTrackResponseModelList,
			List<CustomFoodDetailsResponseModel> customFoodList,
			List<CustomIngredientResponseModel> customIngredientList,
			List<BasicIngredientResponseModel> basicIngredientList) {
		
		System.out.println("Calories before updation: "+caloriesToConsumeNow);
		
		if (!customerOrdersResponseModelList.isEmpty()) {
			Double caloriesConsumedHistoryPerOrder = 0.0;
			Float tempCalories = caloriesToConsumeNow;
			for (CustomerOrdersResponseModel customerOrdersResponseModel : customerOrdersResponseModelList) {
				caloriesConsumedHistoryPerOrder = 0.0;
				for(String customFoodId: customerOrdersResponseModel.getFoodorderid()) {
					for(CustomFoodDetailsResponseModel customFoodDetailsResponseModel:customFoodList) {
						if(customFoodId.equals(customFoodDetailsResponseModel.getUuid())) {
							for(CustomIngredientResponseModel customIngredientResponseModel:customIngredientList) {
								if(customIngredientResponseModel.getCustomFoodDetailId().equals(customFoodDetailsResponseModel.getUuid())) {
									for(BasicIngredientResponseModel basicIngredientResponseModel:basicIngredientList) {
										if(customIngredientResponseModel.getBasicIngredientId().equals(basicIngredientResponseModel.getBUuid())) {
											caloriesConsumedHistoryPerOrder +=  calculateFoodCalories(basicIngredientResponseModel.getCalPerGram(), customIngredientResponseModel.getAmount());
											System.out.println("CALORIES CONSUMED HISTORY PER ORDER: "+caloriesConsumedHistoryPerOrder);
										}
									}
								}
							}
						}
					}
				}
				tempCalories = caloriesToConsumeNow;
				if(caloriesConsumedHistoryPerOrder > caloriesToConsumeNow) {
					System.out.println("BEFORE IF : caloriesConsumedHistoryPerOrder,caloriesToConsumeNow"+caloriesConsumedHistoryPerOrder+","+caloriesToConsumeNow);
					Float difference = (float) (caloriesConsumedHistoryPerOrder-caloriesToConsumeNow);
					tempCalories -= difference;
					System.out.println("AFTER IF : caloriesConsumedHistoryPerOrder,caloriesToConsumeNow"+caloriesConsumedHistoryPerOrder+","+caloriesToConsumeNow);
				}
				else if (caloriesConsumedHistoryPerOrder < caloriesToConsumeNow && caloriesConsumedHistoryPerOrder > 0) {
					System.out.println("BEFORE ELSE: caloriesConsumedHistoryPerOrder,caloriesToConsumeNow"+caloriesConsumedHistoryPerOrder+","+caloriesToConsumeNow);
					Float difference = (float) (caloriesToConsumeNow - caloriesConsumedHistoryPerOrder);
					tempCalories += difference;
					System.out.println("BEFORE ELSE : caloriesConsumedHistoryPerOrder,caloriesToConsumeNow"+caloriesConsumedHistoryPerOrder+","+caloriesToConsumeNow);
				}
			}
			
			caloriesToConsumeNow = tempCalories;
		}

		if (!customerTrackResponseModelList.isEmpty()) {
			Float tempCalories = caloriesToConsumeNow;
			for (CustomerTrackResponseModel customerTrackResponseModel : customerTrackResponseModelList) {
				
				if(customerTrackResponseModel.getCalories() < caloriesToConsumeNow) {
					System.out.println("Consumed Less than recommended");
					Float difference = caloriesToConsumeNow - customerTrackResponseModel.getCalories();
					tempCalories += difference;
				}
				else if(customerTrackResponseModel.getCalories() > caloriesToConsumeNow) {
					System.out.println("Consumed More than recommended, caloriesToconsume = "+caloriesToConsumeNow);
					Float difference = customerTrackResponseModel.getCalories() - caloriesToConsumeNow ;
					System.out.println("difference: "+difference);
					tempCalories -= difference;
				}
			}
			caloriesToConsumeNow = tempCalories;
		}
		System.out.println("Updated calories: "+caloriesToConsumeNow);
		return caloriesToConsumeNow;
	}

	private Float calculateDistance(List<RestaurantResponseModel> restaurantList, String restaurantUuid,
			String coordinates) {

		Float distanceInKms = 0f;
		String restaurantLocation = null;

		for (RestaurantResponseModel restaurantResponseModel : restaurantList) {
			if (restaurantUuid.equals(restaurantResponseModel.getResId())) {
				restaurantLocation = restaurantResponseModel.getCo_ordinates();
			}
		}
		if (restaurantLocation == null) {
			return 0f;
		}

		String[] customerLattitudeLongitude = coordinates.split(",");
		String[] restaurantLattitudeLongitude = restaurantLocation.split(",");
		if (customerLattitudeLongitude.length < 2 || restaurantLattitudeLongitude.length < 2) {
			return 0f;
		}

		Float customerLattitude = Float.parseFloat(customerLattitudeLongitude[0]);
		Float customerLongitude = Float.parseFloat(customerLattitudeLongitude[1]);
		Float restaurantLattitude = Float.parseFloat(restaurantLattitudeLongitude[0]);
		Float restaurantLongitude = Float.parseFloat(restaurantLattitudeLongitude[1]);

		distanceInKms = calculateDistanceInKilometer(customerLattitude, customerLongitude, restaurantLattitude,
				restaurantLongitude);

		return distanceInKms;
	}

	public final static double AVERAGE_RADIUS_OF_EARTH_KM = 6371;

	public float calculateDistanceInKilometer(double userLat, double userLng, double venueLat, double venueLng) {

		double latDistance = Math.toRadians(userLat - venueLat);
		double lngDistance = Math.toRadians(userLng - venueLng);

		double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(Math.toRadians(userLat))
				* Math.cos(Math.toRadians(venueLat)) * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);

		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return (float) (AVERAGE_RADIUS_OF_EARTH_KM * c);
	}

	private Float calculatePersonalCalories(Long startDate, Long targetDate, Float currentWeight, Float targetWeight,
			Float currentBMR) {

		Float numberOfDays = (float) ((targetDate - startDate) / 86400000);
		System.out.println("Number of days: " + numberOfDays);
		Float weightChange = currentWeight - targetWeight;
		Float totalCaloriesToConsume = weightChange * 7700;
		Float caloriesToConsumePerDay = currentBMR - (totalCaloriesToConsume / numberOfDays);
		System.out.println("CaloriesToConsumePerDay " + caloriesToConsumePerDay);
		return caloriesToConsumePerDay;

	}

}
