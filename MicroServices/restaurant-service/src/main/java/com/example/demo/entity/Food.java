package com.example.demo.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;


@Entity
public class Food {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@ManyToMany
	@JoinTable(name = "restaurant_food", joinColumns = @JoinColumn(name = "food_id"), inverseJoinColumns = @JoinColumn(name = "resId"))
	private Set<Restaurant> restaurants = new HashSet<>();
	
	public Food() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public Food(int id, Set<Restaurant> restaurants) {
		super();
		this.id = id;
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
