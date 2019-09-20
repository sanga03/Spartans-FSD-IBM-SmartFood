package com.mycompany.bootstrap;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.mycompany.entity.Customer;
import com.mycompany.entity.Food;
import com.mycompany.entity.UserOrder;
import com.mycompany.repository.CustomerRepository;
import com.mycompany.repository.FoodRepository;
import com.mycompany.repository.OrderRepository;

@Component
public class DevJpaBootStrap implements ApplicationListener<ContextRefreshedEvent> {

	private FoodRepository foodRepository;
	private OrderRepository orderRepository;
	private CustomerRepository customerRepository;
	
	
	public DevJpaBootStrap(FoodRepository foodRepository, OrderRepository orderRepository,
			CustomerRepository customerRepository) {
		super();
		this.foodRepository = foodRepository;
		this.orderRepository = orderRepository;
		this.customerRepository = customerRepository;
	}


	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		// TODO Auto-generated method stub
		init();
	}

	private void init() {
		// TODO Auto-generated method stub

		Customer customer = new Customer("bob");
		Customer customer1 = new Customer("john");
 		Food food = new Food(1l,"Panner curry");
		Food food1 = new Food(2l,"Chicken curry");
		Food food2 = new Food(3l,"Naan");
		List<Food> foods = new ArrayList<Food>();
		UserOrder order = new UserOrder(1l, "20/09/2019", foods, customer);
		UserOrder order1 = new UserOrder(1l, "20/09/2019", foods, customer1);

		food.setOrder(order);
		foods.add(food);
		food1.setOrder(order);
		foods.add(food1);
		food2.setOrder(order1);
		foods.add(food2);
		foodRepository.save(food);
		foodRepository.save(food1);
		foodRepository.save(food2);
		orderRepository.save(order);
		customerRepository.save(customer);
		
	}
}
