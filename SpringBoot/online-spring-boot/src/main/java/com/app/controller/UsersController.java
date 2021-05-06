package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.EditProfileDTO;
import com.app.dto.ResponseDTO;
import com.app.pojos.Role;
import com.app.pojos.Users;
import com.app.service.IUsersService;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UsersController {

	public UsersController() {
		System.out.println("in " + getClass().getName());
	}

	@Autowired
	IUsersService usersService;

	public Users userSignin(String u) {
		System.out.println("in user signin controller: " + u);
		return usersService.userSignin(u);
	}

	@PostMapping("/signup")
	public ResponseDTO<?> userSignup(@RequestBody Users u) {
		System.out.println("in user signup controller: " + u);
		return new ResponseDTO<>(HttpStatus.OK, "signup success", usersService.userSignup(u));
	}

	@GetMapping("/profile/{id}")
	public ResponseDTO<?> getProfile(@PathVariable int id) {
		System.out.println("in user get profile controller: " + id);
		return new ResponseDTO<>(HttpStatus.OK, "profile fetch success", usersService.getProfile(id));
	}

	@PostMapping("/update/{id}")
	public ResponseDTO<?> userUpdate(@PathVariable int id,@RequestBody EditProfileDTO u) {
		System.out.println("in user update controller: " + u + " " + id);
		return new ResponseDTO<>(HttpStatus.OK, "profile update success", usersService.userUpdate(id,u));
	}

	@PatchMapping("/seller/apply/{id}")
	public ResponseDTO<?> applyForSeller(@PathVariable int id) {
		System.out.println("in apply seller user controller: " + id);
		return new ResponseDTO<>(HttpStatus.OK, "seller apply success", usersService.applySeller(id));
	}

	@GetMapping("/list/users")
	public ResponseDTO<?> getUsersListAll() {
		System.out.println("in get all products Search list product controller");
		return new ResponseDTO<>(HttpStatus.OK, "products found", usersService.getUsersListAll());
	}
	
	@GetMapping("/list/sellers")
	public ResponseDTO<?> getSellersListAll() {
		System.out.println("in get all products Search list product controller");
		return new ResponseDTO<>(HttpStatus.OK, "products found", usersService.getSellerListAll());
	}

	@PostMapping("/action/approve-suspend")
	public ResponseDTO<?> userApproveSuspend(@RequestBody Users u) {
		System.out.println("in all user approve suspend controller: " + u);
		return new ResponseDTO<>(HttpStatus.OK, "user updated", usersService.userActionApproveSuspend(u));
	}

	@PostMapping("/action/role-change")
	public ResponseDTO<?> manageSeller(@RequestBody Users u) {
		System.out.println("in manage all seller controller: " + u);
		return new ResponseDTO<>(HttpStatus.OK, "seller updated", usersService.userActionManageSeller(u));
	}
	
	@PatchMapping("/action/apply-for-seller")
	public ResponseDTO<?> applyForSeller() {
		System.out.println("in apply for seller controller: ");
		return new ResponseDTO<>(HttpStatus.OK, "applied for seller", usersService.userActionApplyForSeller());
	}

}
