package com.base_package.comparator;

import java.util.Comparator;

import com.base_package.model.PersonalFoodResponseModel;

public class PersonalFoodComparator implements Comparator<Object> {

	@Override
	public int compare(Object o1, Object o2) {

		PersonalFoodResponseModel p1 = (PersonalFoodResponseModel) o1;
		PersonalFoodResponseModel p2 = (PersonalFoodResponseModel) o2;

		if (p1.getPriority() > p2.getPriority()) {
			return -1;
		}

		else if (p1.getPriority() < p2.getPriority()) {
			return 1;
		}

		else if (p1.getDistance() < p2.getDistance()) {
			return -1;
		}

		else if (p1.getDistance() > p2.getDistance()) {
			return 1;
		}

		else if (p1.getRating() > p2.getRating()) {
			return -1;
		}

		else if (p1.getRating() < p2.getRating()) {
			return -1;
		}

		else {
			return 0;
		}

	}

}
