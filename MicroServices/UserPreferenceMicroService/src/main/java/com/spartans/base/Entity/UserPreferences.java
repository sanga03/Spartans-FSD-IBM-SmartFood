package com.spartans.base.Entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = " userpreferences")
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferences {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//Auto Generated id
	@Column(name = "id")
	int id;
	//uUuid same as user account table
	@Column(name="u_uuid")
	String uUuid;
	//An auto Generated uuid for userPreference
	@Column(name="upr_uuid")
	String uprUuid;
	//His favorite category (Veg/non-veg)
	@Column(name = "category")
	int category;
	//if he wants to reduce weight
	@Column(name="target_weight")
	Float targetWeight;
	@Column(name ="target_date")
	Date targetDate;
	@SuppressWarnings("deprecation")
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "userPreferences")
	@Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
//	@OnDelete(action = OnDeleteAction.NO_ACTION)
	Set<Cuisines> cuisines;
	@Override
	public String toString() {
		return "UserPreferences [id=" + id + ", uUuid=" + uUuid + ", uprUuid=" + uprUuid + ", category=" + category
				+ ", targetWeight=" + targetWeight + ", cuisines=" + cuisines + "]";
	}
	
	
}
