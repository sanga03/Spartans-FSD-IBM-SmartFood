package com.example.demo.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;


@Entity
public class Food {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	
	public Food(String name) {
		super();
		this.name = name;
	}

	@ManyToMany
	@JoinTable(name = "restaurant_food", joinColumns = @JoinColumn(name = "food_id"), inverseJoinColumns = @JoinColumn(name = "id"))
	private Set<Restaurant> restaurants = new HashSet<>();
	
	public Food() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public Food( Set<Restaurant> restaurants) {
		super();
//		this.id = id;
		this.restaurants = restaurants;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Set<Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(Set<Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
}
