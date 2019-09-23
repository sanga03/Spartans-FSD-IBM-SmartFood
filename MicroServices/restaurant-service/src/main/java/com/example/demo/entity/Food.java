package com.example.demo.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;


@Entity
public class Food {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String name;
	
	public Food(long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	
	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public void setId(long id) {
		this.id = id;
	}


	@ManyToMany
	@JoinTable(name = "restaurant_food", joinColumns = @JoinColumn(name = "id"), inverseJoinColumns = @JoinColumn(name = "res_id"))
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
	
	public long getId() {
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
