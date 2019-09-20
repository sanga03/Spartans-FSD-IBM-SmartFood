package com.spartans.base.Entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Cuisines {
	@Id
	int cUid;
@ManyToOne
UserPreferences userPreferences;
String cuisine;
}
