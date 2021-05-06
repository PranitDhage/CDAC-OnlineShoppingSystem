package com.app.service;

import java.util.List;

import com.app.pojos.Company;

public interface ICompanyService {

	List<Company> companyListAll();

	Company addCompany(Company company);

	String deleteCompany(int cat_id);

	Company updateCompany(Company company);

}
