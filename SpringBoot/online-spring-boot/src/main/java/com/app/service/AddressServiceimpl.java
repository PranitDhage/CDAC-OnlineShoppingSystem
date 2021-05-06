package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.dao.AddressRepository;
import com.app.dao.UsersRepository;
import com.app.pojos.Address;
import com.app.pojos.Users;

@Service
@Transactional
public class AddressServiceimpl implements IAddressService {

	@Autowired
	AddressRepository addressRepo;

	@Autowired
	UsersRepository usersRepo;

	@Override
	public List<Address> fetchAddress() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		Users u = usersRepo.findByUserName(username);
		
		return addressRepo.findByUser(u);
	}

	@Override
	public Address addAddress(Address a) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		Users u = usersRepo.findByUserName(username);
		a.setUser(u);

		return addressRepo.save(a);
	}

}
