package com.app.jwttoken.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.UsersRepository;
import com.app.pojos.Users;

@Service
public class MyUserDetailsService implements UserDetailsService {
	
	@Autowired
	UsersRepository repo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users u = repo.findByUserEmail(username);
		return new User(u.getUserEmail(), u.getUserPassword(), new ArrayList<>());
	}
	
	
}
