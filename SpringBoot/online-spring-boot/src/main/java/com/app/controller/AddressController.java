package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.Address;
import com.app.service.IAddressService;

@RestController
@CrossOrigin
@RequestMapping("/address")
public class AddressController {
	public AddressController() {
		System.out.println("in " + getClass().getName());
	}

	@Autowired
	IAddressService addressService;

	@GetMapping("/getall")
	public ResponseDTO<?> fetchAddress() {
		System.out.println("in fetch address controller: ");
		return new ResponseDTO<>(HttpStatus.OK, "address found", addressService.fetchAddress());
	}
	
	@PostMapping("/add")
	public ResponseDTO<?> addAddress(@RequestBody Address a) {
		System.out.println("in add address controller: " + a);
		return new ResponseDTO<>(HttpStatus.OK, "address added", addressService.addAddress(a));
	}
}
