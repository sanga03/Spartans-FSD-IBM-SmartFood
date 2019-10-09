package com.base_package.comparator;

import java.util.Comparator;

import com.base_package.model.DefaultFoodResponseModel;

public class DefaultFoodComparator implements Comparator<Object> {

	@Override
	public int compare(Object o1, Object o2) {

		DefaultFoodResponseModel d1 = (DefaultFoodResponseModel) o1;
		DefaultFoodResponseModel d2 = (DefaultFoodResponseModel) o2;

		if (d1.getRating() < d2.getRating()) {
			return -1;
		}

		else if (d1.getRating() > d2.getRating()) {
			return 1;
		}

		else {
			return 0;
		}
	}

}
