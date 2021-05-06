package com.app.service;

import java.util.List;

import com.app.pojos.Address;

public interface IAddressService {

	Address addAddress(Address a);

	List<Address> fetchAddress();

}
