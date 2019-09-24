package com.project.demo.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "food")
public class Food {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "fuid")
	private String fUid;
	
	@Column(name = "imageLink")
	private String image;//stores link of the image
	
	@Column(name = "name")
	private String name;

	@Column(name = "category")
	private Boolean category;
	
	@Column(name = "cuisine")
	private String cuisine;
	
	@Column(name = "rUid")
	private String rUid;//dummy restaurant id	
}
