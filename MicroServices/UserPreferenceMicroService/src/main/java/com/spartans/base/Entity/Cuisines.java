package com.spartans.base.Entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "userprefcuisines ")
@NoArgsConstructor
@AllArgsConstructor
public class Cuisines {
	@Id
	@Column(name = "id")
	int id;
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_preferences_id")
	UserPreferences userPreferences;
	@Column(name = "u_uuid")
	String uUuid;
	@Column(name = "cuisine")
	String cuisine;
	@Override
	public String toString() {
		return "Cuisines [id=" + id + ", uUuid=" + uUuid + ", cuisine=" + cuisine + "]";
	}

}
