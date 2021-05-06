package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Role;
import com.app.pojos.Users;

public interface UsersRepository extends JpaRepository<Users, Integer> {
//	@Query("select u from Users u where u.user_email=:em and u.user_password=:pw")
//	Users authenticate(@Param("em") String email, @Param("pw") String password);
	
	Users findByUserName(String username);
	
	Users findByUserEmailAndUserPassword(String email, String password);

	Users findByUserEmail(String username);
	
	List<Users> findByUserRoleOrUserRole(Role role1,Role role2);
	
}