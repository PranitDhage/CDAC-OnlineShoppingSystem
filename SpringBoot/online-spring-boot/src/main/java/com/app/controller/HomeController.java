package com.app.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class HomeController {
	
	public HomeController() {
		System.out.println("in " + getClass().getName());
	}

	@RequestMapping(value = "/")
	public String getHomepage() {
		return "/index";
	}
	
	
}
