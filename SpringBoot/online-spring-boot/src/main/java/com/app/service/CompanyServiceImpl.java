package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CompanyRepository;
import com.app.pojos.Company;

@Service
@Transactional
public class CompanyServiceImpl implements ICompanyService {

	@Autowired
	CompanyRepository companyRepo;

	@Override
	public List<Company> companyListAll() {
		return companyRepo.findAll();
	}

	@Override
	public Company addCompany(Company company) {
		return companyRepo.save(company);
	}
	
	@Override
	public String deleteCompany(int cat_id) {
		if (companyRepo.existsById(cat_id)) {
			companyRepo.deleteById(cat_id);
			return "category deleted";
		}
		return "category not found";
	}

	@Override
	public Company updateCompany(Company company) {
		Company comp = companyRepo.findById(company.getCompId()).get();
		comp.setCompTitle(company.getCompTitle());
		comp.setCompDescription(company.getCompDescription());
		return companyRepo.save(comp);
	}

}
