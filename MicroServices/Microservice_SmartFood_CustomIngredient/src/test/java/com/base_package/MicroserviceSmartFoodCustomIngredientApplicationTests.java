package com.base_package;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.base_package.service.CustomIngredientService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MicroserviceSmartFoodCustomIngredientApplicationTests {

	@Test
	public void testCustomIngredientService() {
		CustomIngredientService customIngredientService = new CustomIngredientService();
		
	}

}
