package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Products;
import com.app.pojos.Users;

public interface ProductsRepository extends JpaRepository<Products, Integer>{

	//to get all products of a particular seller
	List<Products> findAllByUser(Users user);

	//for search bar
	@Query("SELECT p from Products p where p.prodTitle like %:pname%")
	List<Products> findByProdTitle(@Param("pname") String prod_name);
	
}
