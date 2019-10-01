package com.spartans.base.Repo;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.spartans.base.Entity.UserPreferences;

@Repository
public interface UserPrefRepo extends JpaRepository<UserPreferences, Integer>{
//	@Query("select cuisines from UserPreferences u inner join u.cuisines where u.uUuid=:id")
//	public List<UserPreferences> findAllCusines(@Param("id") String id);
	@Query("select id from UserPreferences where uUuid=:uUuid ")
	public Integer findId(@Param("uUuid") String uUuid);
	@Transactional
	public void deleteByUUuid(String uUuid);
//	@Query("SELECT LAST_INSERT_ID()")
//	public BigInteger findLastId();
	
}
