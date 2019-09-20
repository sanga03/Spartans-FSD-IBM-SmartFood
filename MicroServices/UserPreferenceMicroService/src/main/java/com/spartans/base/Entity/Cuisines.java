package com.spartans.base.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name="cuisines")
public class Cuisines {
	@Id
	@Column(name ="id")
	int cUid;
@ManyToOne
@JoinColumn(name = "user_preferences_id")
UserPreferences userPreferences;
@Column(name="cuisine")
String cuisine;
}
