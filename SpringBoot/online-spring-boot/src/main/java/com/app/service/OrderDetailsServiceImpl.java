package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.OrderDetailsRepository;
import com.app.pojos.Myorder;
import com.app.pojos.Orderdetails;

@Service
@Transactional
public class OrderDetailsServiceImpl implements IOrderDetailsService{
	@Autowired
	OrderDetailsRepository orderDetailsRepo;

	@Autowired
	IMyorderService myorderService;
	
	@Override
	public Orderdetails getOrderDetails(int myorder_id) {
		Myorder myOrder = myorderService.getMyorderByMyorderId(myorder_id);
		return orderDetailsRepo.findByMyorder(myOrder);
	}
	
	
}
