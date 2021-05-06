package com.app.service;

import java.util.List;

import com.app.pojos.Myorder;

public interface IMyorderService {

	List<Myorder> getAllMyordersOfCurrentUser();
	
	Myorder getMyorderByMyorderId(int myorder_id);

	float getProductRatingAvg(int prod_id);
	
	List<Myorder> getProductComments(int prod_id);

	List<Myorder> getAllMyordersOfCustomers();

	Myorder updateMyorderStatus(Myorder myorder);
	
}
