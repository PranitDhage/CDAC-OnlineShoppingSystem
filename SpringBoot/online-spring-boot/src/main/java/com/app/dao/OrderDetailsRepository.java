package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Myorder;
import com.app.pojos.Orderdetails;

public interface OrderDetailsRepository extends JpaRepository<Orderdetails, Integer> {

	Orderdetails findByMyorder(Myorder myorder_id);

}
