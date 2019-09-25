package com.example.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.UniqueElements;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Entity
@Table(name = "basic_ingredent")
@NoArgsConstructor
@AllArgsConstructor
public class BasicIng {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
@Column(unique = true)
private String bUuid;
@Column(unique = true)
private String name;
private float calPerGram;
}
