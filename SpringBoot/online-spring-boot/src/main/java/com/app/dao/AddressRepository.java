package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Address;
import com.app.pojos.Users;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	List<Address> findByUser(Users u);

}
