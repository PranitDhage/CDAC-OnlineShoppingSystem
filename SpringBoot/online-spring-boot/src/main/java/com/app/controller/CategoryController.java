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
import com.app.pojos.Category;
import com.app.service.ICategoryService;

@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	ICategoryService categoryService;

	public CategoryController() {
		System.out.println("in " + getClass().getName());
	}

	@GetMapping("/list")
	public ResponseDTO<?> getcategoryListAll() {
		System.out.println("in get all products list product controller");
		return new ResponseDTO<>(HttpStatus.OK, "categories found", categoryService.categoryListAll());
	}

	@PostMapping("/add")
	public ResponseDTO<?> addCategory(@RequestBody Category category) {
		System.out.println("in get add categoey controller: " + category);
		return new ResponseDTO<>(HttpStatus.OK, "category added", categoryService.addCategory(category));
	}

	@DeleteMapping("/delete/{cat_id}")
	public ResponseDTO<?> deleteCategory(@PathVariable int cat_id) {
		System.out.println("in get product delete product controller: " + cat_id);
		return new ResponseDTO<>(HttpStatus.OK, "category deleted", categoryService.deleteCategory(cat_id));
	}

	@PostMapping("/update/{cat_id}")
	public ResponseDTO<?> updateCategory(@PathVariable int cat_id, @RequestBody Category category) {
		System.out.println("in get product qty update category controller: " + category);
		category.setCatId(cat_id);
		return new ResponseDTO<>(HttpStatus.OK, "category updated", categoryService.updateCategory(category));
	}

}
