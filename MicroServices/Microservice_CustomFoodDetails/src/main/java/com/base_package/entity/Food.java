package com.base_package.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String uuid;
	private String name;

	@ManyToMany
	@JoinTable(name = "food_restaurant", joinColumns = @JoinColumn(name = "food_id"), inverseJoinColumns = @JoinColumn(name = "restaurant_id"))
	private List<Restaurant> restaurants = new ArrayList<Restaurant>();

	public Food(String name) {
		super();
		this.name = name;
		this.setUuid("F_" + UUID.randomUUID().toString());
	}

}
