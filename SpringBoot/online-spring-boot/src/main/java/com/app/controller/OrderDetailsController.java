package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.service.IOrderDetailsService;

@RestController
@CrossOrigin
@RequestMapping("/orderdetails")
public class OrderDetailsController {
	public OrderDetailsController() {
		System.out.println("in " + getClass().getName());
	}
	
	@Autowired
	IOrderDetailsService orderDetailsService;
	
	@GetMapping("/{myorder_id}")
	public ResponseDTO<?> orderDetailsFetch(@PathVariable int myorder_id) {
		System.out.println("in user orderdetails fetch controller: ");
		return new ResponseDTO<>(HttpStatus.OK, "my orders fetched", orderDetailsService.getOrderDetails(myorder_id));
	}
}
