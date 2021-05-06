package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ProductsRepository;
import com.app.pojos.Products;
import com.app.pojos.Users;

@Service
@Transactional
public class ProductServiceImpl implements IProductService {

	public ProductServiceImpl() {
		System.out.println("in product service impl const");
	}

	@Autowired
	ProductsRepository repo;

	//for getting seller products
	@Autowired
	IUsersService userService;
	
	@Override
	public List<Products> productListAll() {
		return repo.findAll();
	}

	@Override
	public List<Products> productListSeller() {
		Users u = userService.getUser();
		return repo.findAllByUser(u);
	}

	@Override
	public Products addProduct(Products product) {
		product.setUser(userService.getUser());
		System.out.println(product.getCategory().getCatId());
		System.out.println(product.getCompany().getCompId());
		return repo.save(product);
	}

	@Override
	public Products getProductDetails(int prod_id) {
		return repo.findById(prod_id).get();
	}

	@Override
	public String deleteProduct(int prod_id) {
		if (repo.existsById(prod_id)) {
			repo.deleteById(prod_id);
			return "deleted successfully";
		}
		return "no product found";
	}

	@Override
	public Products updateProduct(Products product) {
		Products p = repo.findById(product.getProdId()).get();
		p.setProdQty(product.getProdQty());
		p.setProdPrice(product.getProdPrice());
		p.setProdTitle(product.getProdTitle());
		p.setPhoto(product.getPhoto());
		return repo.save(p);
	}

	@Override
	public List<Products> productSearchListAll(String prod_name) {
		return repo.findByProdTitle(prod_name);
	}

}
