package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Cart;
import com.app.pojos.Users;


public interface CartRepository extends JpaRepository<Cart, Integer>{

	List<Cart> findByUser(Users u);
}
