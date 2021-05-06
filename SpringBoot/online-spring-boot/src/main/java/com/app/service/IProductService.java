package com.app.service;

import java.util.List;

import com.app.pojos.Products;

public interface IProductService {

	List<Products> productListAll();

	List<Products> productListSeller();

	Products addProduct(Products product);

	Products getProductDetails(int prod_id);

	String deleteProduct(int prod_id);

	Products updateProduct(Products p);

	List<Products> productSearchListAll(String prod_name);
	
}
