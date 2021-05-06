package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.Myorder;
import com.app.service.IMyorderService;

@RestController
@CrossOrigin
@RequestMapping("/myorder")
public class MyorderController {
	public MyorderController() {
		System.out.println("in " + getClass().getName());
	}
	
	@Autowired
	IMyorderService myorderService;
	
	@GetMapping("/")
	public ResponseDTO<?> myorderFetch() {
		System.out.println("in myorder fetch controller: ");
		return new ResponseDTO<>(HttpStatus.OK, "my orders fetched", myorderService.getAllMyordersOfCurrentUser());
	}
	
	@GetMapping("/seller")
	public ResponseDTO<?> myordersOfCustomersForSellerFetch() {
		System.out.println("in user seller customer myorder fetch controller: ");
		return new ResponseDTO<>(HttpStatus.OK, "customers myorders fetched", myorderService.getAllMyordersOfCustomers());
	}
	
	@PutMapping("/update/status")
	public ResponseDTO<?> myordersStatusChange(@RequestBody Myorder myorder) {
		System.out.println("in user seller customer myorder fetch controller: " + myorder);
		return new ResponseDTO<>(HttpStatus.OK, "customers myorders fetched", myorderService.updateMyorderStatus(myorder));
	}
	
}
