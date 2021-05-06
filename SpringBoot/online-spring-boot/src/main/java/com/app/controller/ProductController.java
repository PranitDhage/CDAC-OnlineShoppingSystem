package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ResponseDTO;
import com.app.pojos.Category;
import com.app.pojos.Company;
import com.app.pojos.Products;
import com.app.pojos.Users;
import com.app.service.IMyorderService;
import com.app.service.IProductService;

@RestController
@CrossOrigin
@RequestMapping("/product")
public class ProductController {

	@Autowired
	IProductService productService;
	
	@Autowired
	IMyorderService myorderService;

	@Autowired
	BucketController bucketController;

	public ProductController() {
		System.out.println("in " + getClass().getName());
	}

	@GetMapping("/list")
	public ResponseDTO<?> getProductListAll() {
		System.out.println("in get all products list product controller");
		return new ResponseDTO<>(HttpStatus.OK, "products found", productService.productListAll());
	}

	@GetMapping("/seller")
	public ResponseDTO<?> getProductListSeller() {
		System.out.println("in get seller products list product controller: " );
		return new ResponseDTO<>(HttpStatus.OK, "products found", productService.productListSeller());
	}

	@PostMapping("/add")
	public ResponseDTO<?> addProduct(@RequestPart String prod_title, @RequestPart String prod_description,
			@RequestPart String prod_price, @RequestPart String prod_qty, @RequestPart String cat_id,
			@RequestPart String comp_id, @RequestPart(value = "file") MultipartFile file) {

		String imagePath = bucketController.uploadFile(file);

		String username = SecurityContextHolder.getContext().getAuthentication().getName();

		System.out.println(username);
		System.out.println("in get product add product controller: " + prod_description + " " + prod_price + " "
				+ prod_qty + " " + prod_title + " " + cat_id + " " + comp_id + " " + imagePath);

		Products p = new Products();
		p.setCategory(new Category());
		p.getCategory().setCatId(Integer.valueOf(cat_id));
		p.setCompany(new Company());
		p.getCompany().setCompId(Integer.valueOf(comp_id));
		p.setPhoto(imagePath);
		p.setProdPrice(Float.valueOf(prod_price));
		p.setProdQty(Integer.valueOf(prod_qty));
		p.setProdTitle(prod_title);
		p.setProdDescription(prod_description);
		p.setUser(new Users());
		p.getUser().setUserName(username);

		return new ResponseDTO<>(HttpStatus.OK, "product added", productService.addProduct(p));
	}

	@GetMapping("/{prod_id}")
	public ResponseDTO<?> getProductDetails(@PathVariable int prod_id) {
		System.out.println("in get product details product controller: " + prod_id);
		return new ResponseDTO<>(HttpStatus.OK, "product found", productService.getProductDetails(prod_id));
	}

	@DeleteMapping("/delete/{prod_id}")
	public ResponseDTO<?> deleteProduct(@PathVariable int prod_id) {
		System.out.println("in get product delete product controller: " + prod_id);
		return new ResponseDTO<>(HttpStatus.OK, "product deleted", productService.deleteProduct(prod_id));
	}

	@PostMapping("/update/{prod_id}")
	public ResponseDTO<?> updateProduct(@PathVariable int prod_id, @RequestPart String prod_title,
			@RequestPart String prod_price, @RequestPart String prod_qty, @RequestPart String photo,
			@RequestPart(value = "file") MultipartFile file) {

		System.out.println("in get product qty update product controller: " + prod_qty);

		Products p = new Products();

		int qty = Integer.parseInt(prod_qty);		
		
		p.setProdId(prod_id);
		p.setProdPrice(Float.valueOf(prod_price));
		p.setProdQty(qty);
		p.setProdTitle(prod_title);
		p.setPhoto(photo);

		System.out.println(p);

		String delete = bucketController.deleteFile(photo);
		System.out.println(delete);
		String imagePath = bucketController.uploadFile(file);

		p.setPhoto(imagePath);

		return new ResponseDTO<>(HttpStatus.OK, "product updated", productService.updateProduct(p));

	}

	@GetMapping("/ratingavg/{prod_id}")
	public ResponseDTO<?> getProductRating(@PathVariable int prod_id) {
		System.out.println("in get product ratings product controller: " + prod_id);
		return new ResponseDTO<>(HttpStatus.OK, "product found", myorderService.getProductRatingAvg(prod_id));
	}

	@GetMapping("/comments/{prod_id}")
	public ResponseDTO<?> getProductComments(@PathVariable int prod_id) {
		System.out.println("in get product comments product controller: " + prod_id);
		return new ResponseDTO<>(HttpStatus.OK, "product found", myorderService.getProductComments(prod_id));
	}
	
	@GetMapping("/list/search/{prod_name}")
	public ResponseDTO<?> getProductSearchListAll(@PathVariable String prod_name) {
		System.out.println("in get all products Search list product controller: " + prod_name);
		return new ResponseDTO<>(HttpStatus.OK, "products found", productService.productSearchListAll(prod_name));
	}
	
}
