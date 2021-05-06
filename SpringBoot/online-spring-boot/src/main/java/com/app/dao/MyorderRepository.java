package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Myorder;

public interface MyorderRepository extends JpaRepository<Myorder, Integer>{

	@Query("Select m from Myorder m left outer join fetch m.orderDetails where m.user.userId= :u ")
	List<Myorder> getMyOrderWithOrderDetais(@Param("u") Integer userId);

	@Query("Select m from Myorder m left outer join fetch m.orderDetails o where o.product.prodId = :pid ")
	List<Myorder> getProductByProdId(@Param("pid") Integer prod_id);

	@Query("Select m from Myorder m left outer join fetch m.orderDetails o where o.product.user.userId = :u ")
	List<Myorder> getAllCustomersMyOrdersWithOrderDetais(@Param("u")Integer userId);
	
}
