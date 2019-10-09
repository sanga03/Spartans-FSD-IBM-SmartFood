package com.base_package;


import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.base_package.service.ListFoodsService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MicroserviceSmartFoodFeignProgressApplicationTests {

	@Test
	public void contextLoads() {
		
		ListFoodsService listFoodsService = new ListFoodsService();
		assertEquals(listFoodsService,listFoodsService);
	}
	
	@Test
	public void testCalculateDistanceInKilometer() {
		
		ListFoodsService listFoodsService = new ListFoodsService();
		assertEquals(listFoodsService.calculateDistanceInKilometer(13.77, 77.13, 13.77, 77.13), 0.0,0.0);
	}
	
	@Test
	public void testCalculateFoodCalories() {
		
		ListFoodsService listFoodsService = new ListFoodsService();
		assertEquals(listFoodsService.calculateFoodCalories((float) 100.0, 200.0), 200.0,0.0);	
	}

}
