package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ResponseDTO;
import com.app.pojos.Company;
import com.app.service.ICompanyService;

@CrossOrigin
@RestController
@RequestMapping("/company")
public class CompanyController {
	
	@Autowired
	ICompanyService companyService;

	public CompanyController() {
		System.out.println("in " + getClass().getName());
	}

	@GetMapping("/list")
	public ResponseDTO<?> getCompanyListAll() {
		System.out.println("in get all Company list controller");
		return new ResponseDTO<>(HttpStatus.OK, "Company found", companyService.companyListAll());
	}

	@PostMapping("/add")
	public ResponseDTO<?> addCompany(@RequestBody Company company) {
		System.out.println("in get add company controller: " + company);
		return new ResponseDTO<>(HttpStatus.OK, "Company added", companyService.addCompany(company));
	}

	@DeleteMapping("/delete/{cat_id}")
	public ResponseDTO<?> deleteCompany(@PathVariable int comp_id) {
		System.out.println("in get company delete product controller: " + comp_id);
		return new ResponseDTO<>(HttpStatus.OK, "company deleted", companyService.deleteCompany(comp_id));
	}

	@PostMapping("/update/{comp_id}")
	public ResponseDTO<?> updateCompany(@PathVariable int comp_id, @RequestBody Company company) {
		System.out.println("in update company controller: " + company);
		company.setCompId(comp_id);
		return new ResponseDTO<>(HttpStatus.OK, "company updated", companyService.updateCompany(company));
	}

}
