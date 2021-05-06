package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.MyorderRepository;
import com.app.pojos.Myorder;
import com.app.pojos.Orderdetails;

@Service
@Transactional
public class MyorderServiceImpl implements IMyorderService {
	@Autowired
	MyorderRepository myorderRepo;

	@Autowired
	IUsersService usersService;

	@Override
	public List<Myorder> getAllMyordersOfCurrentUser() {
		return myorderRepo.getMyOrderWithOrderDetais(usersService.getUser().getUserId());
	}

	@Override
	public Myorder getMyorderByMyorderId(int myorder_id) {
		return myorderRepo.findById(myorder_id).get();
	}
	
	@Override
	public List<Myorder> getAllMyordersOfCustomers() {
		return myorderRepo.getAllCustomersMyOrdersWithOrderDetais(usersService.getUser().getUserId());
	}

	@Override
	public float getProductRatingAvg(int prod_id) {
		List<Myorder> list = myorderRepo.getProductByProdId(prod_id);

		float rating = 0;
		int count = 0;

		for (Myorder myorder : list) {
			List<Orderdetails> od = myorder.getOrderDetails();
			for (Orderdetails o : od) {
				if (o.getRating() != null) {
					rating = rating + o.getRating();
					count++;
				}
			}
		}
		return rating / count;
	}

	@Override
	public List<Myorder> getProductComments(int prod_id) {
		return myorderRepo.getProductByProdId(prod_id);
	}

	@Override
	public Myorder updateMyorderStatus(Myorder myorder) {
		Myorder newMyorder = myorderRepo.findById(myorder.getMyorderId()).get();
		newMyorder.setStatus(myorder.getStatus());
		newMyorder.getOrderDetails().size();	// accessing size of order details to avoid lazy init error
		return myorderRepo.save(newMyorder);
	}

	
}
